import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import * as bcryptjs from 'bcryptjs';
import { Account } from 'src/accounts/account.model';
import { CreateAccountUserDto } from 'src/accounts/dto/create-account-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAccountCompanyDto } from 'src/accounts/dto/create-account-company.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateCompanyDto } from 'src/companies/dto/create_company.dto';
import { ActivationLinksService } from './activation_links/activation_links.service';
import { TokensService } from './tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(private accountsService: AccountsService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private companiesService: CompaniesService,
        private activationLinksService: ActivationLinksService,
        private tokensService: TokensService){}

    async login(dto: CreateAccountDto){
        const account = await this.validateAccount(dto);
        return this.generateToken(account);
    }

    private async register(dto: CreateAccountDto, ip){
        let account = await this.accountsService.getAccountByEmail(dto.email);
        if(account != null) throw new HttpException("Такой аккаунт уже существует", HttpStatus.BAD_REQUEST);
        const hashPassword = await bcryptjs.hash(dto.password, 10);
        account = await this.accountsService.createAccount(new CreateAccountDto(dto.email, hashPassword));

        this.activationLinksService.create(account.id);

        const refreshToken = this.tokensService.generateRefreshToken(account);
        await this.tokensService.saveRefreshToken(refreshToken, account.id, ip);
        const accessToken = await this.generateToken(account);

        return {account, accessToken, refreshToken};
    }

    async registerUser(dto: CreateAccountUserDto, ip){
        let dtoAccountTokens = await this.register(new CreateAccountDto(dto.email, dto.password), ip);
        this.usersService.createUser(new CreateUserDto(dtoAccountTokens.account.id, dto.login));
        let {account, accessToken, refreshToken} = dtoAccountTokens;
        return {accessToken, refreshToken};
    }

    async registerCompany(dto: CreateAccountCompanyDto, ip){
        let dtoAccountTokens = await this.register(new CreateAccountDto(dto.email, dto.password), ip);
        this.companiesService.create(new CreateCompanyDto(
            dtoAccountTokens.account.id,
            dto.company_name,
            dto.surname,
            dto.name,
            dto.patronymic,
            dto.phone_number,
            dto.company_type_id,
            dto.inn_file,
            dto.official_letter
        ));
        let {account, accessToken, refreshToken} = dtoAccountTokens;
        return {accessToken, refreshToken};
    }

    private async generateToken(account: Account){
        const payload = {email: account.email, id: account.id, roles: account.roles}
        const tokenAccess = await this.jwtService.sign(payload);
        return tokenAccess;
    }

    //TODO обновление access токена
    async refresh(){

    }

    //TODO удаление всех токенов
    async logout(){

    }

    //TODO получение сслки для подтверждения почты
    async getActivateLink(){

    }

    private async validateAccount(dto: CreateAccountDto){
        const account = await this.accountsService.getAccountByEmail(dto.email);
        const passwordEqual = await bcryptjs.compare(dto.password, account.password);
        if(account && passwordEqual){
            return account;
        }

        throw new UnauthorizedException('Неверный пароль или логин');
    }
}
