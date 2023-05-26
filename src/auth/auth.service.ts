import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
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
import * as jwt from 'jsonwebtoken';
import { FolderProjectsService } from 'src/folder-projects/folder-projects.service';

@Injectable()
export class AuthService {
    constructor(private accountsService: AccountsService,
        private usersService: UsersService,
        private companiesService: CompaniesService,
        private activationLinksService: ActivationLinksService,
        private tokensService: TokensService,
        private folderProjectsService: FolderProjectsService){}

    async login(dto: CreateAccountDto, ip){
        const account = await this.validateAccount(dto);
        const refreshToken = this.tokensService.generateRefreshToken(account);
        await this.tokensService.saveRefreshToken(refreshToken, account.id, ip);
        const accessToken = await this.generateToken(account)
        return {refreshToken, accessToken, account};
    }

    private async register(dto: CreateAccountDto, ip, isCompany: boolean){
        let account = await this.accountsService.getAccountByEmail(dto.email);
        if(account != null) throw new HttpException("Такой аккаунт уже существует", HttpStatus.BAD_REQUEST);
        const hashPassword = await bcryptjs.hash(dto.password, 10);
        account = await this.accountsService.createAccount(new CreateAccountDto(dto.email, hashPassword));
        if(isCompany){
            await this.accountsService.addRoleForCompany(account.id);
        }
        this.activationLinksService.create(account.id);

        const refreshToken = this.tokensService.generateRefreshToken(account);
        await this.tokensService.saveRefreshToken(refreshToken, account.id, ip);
        const accessToken = await this.generateToken(account);

        return {account, accessToken, refreshToken};
    }

    async registerUser(dto: CreateAccountUserDto, ip){
        let dtoAccountTokens = await this.register(new CreateAccountDto(dto.email, dto.password), ip, false);
        this.usersService.createUser(new CreateUserDto(dtoAccountTokens.account.id, dto.login));
        let {account, accessToken, refreshToken} = dtoAccountTokens;
        await this.folderProjectsService.createDefaultFolders(account.id, ["Неотсортированные", 
            "Отправленные", 
            "Архив", 
            "Корзина"]);
        return {accessToken, refreshToken, account};
    }

    async registerCompany(dto: CreateAccountCompanyDto, ip, files: any[]){
        let dtoAccountTokens = await this.register(new CreateAccountDto(dto.email, dto.password), ip, true);
        this.companiesService.create(new CreateCompanyDto(
            dtoAccountTokens.account.id,
            dto.company_name,
            dto.surname,
            dto.name,
            dto.patronymic,
            dto.phone_number,
            dto.company_type_id
        ), files);
        let {account, accessToken, refreshToken} = dtoAccountTokens;
        await this.folderProjectsService.createDefaultFolders(account.id, ["Неотсортированные", 
            "Архив", 
            "Корзина"]);
        return {accessToken, refreshToken, account};
    }

    private async generateToken(account: Account){
        const payload = {email: account.email, id: account.id, roles: account.roles}
        const tokenAccess = await jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '15m'});
        return tokenAccess;
    }

    async refresh(refreshToken, ip){
        const accountData = await this.tokensService.validateRefreshToken(refreshToken);
        const tokenData = await this.tokensService.findRefreshToken(refreshToken);
        console.log('token data ', tokenData);
        if(!accountData || !tokenData){
            throw new UnauthorizedException;
        }
        const account = await this.accountsService.getAccountById(accountData.id);
        const refreshTokenNew = this.tokensService.generateRefreshToken(account);
        await this.tokensService.saveRefreshToken(refreshToken, account.id, ip);
        const accessToken = await this.generateToken(account);

        return {account, accessToken, refreshTokenNew};
    }

    async validateAccessToken(accessToken){
        try{
            const accountData = jwt.verify(accessToken, process.env.PRIVATE_KEY);
            return accountData;
        } catch(e){
            return null;
        }
    }

    async logout(refreshToken){
        const tokenValue = refreshToken.refreshToken;
        const token = await this.tokensService.removeToken(tokenValue);
        return token;
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
