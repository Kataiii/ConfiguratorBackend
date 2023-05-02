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

@Injectable()
export class AuthService {
    constructor(private accountsService: AccountsService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private companiesService: CompaniesService){}

    async login(dto: CreateAccountDto){
        const account = await this.validateAccount(dto);
        return this.generateToken(account);
    }

    private async register(dto: CreateAccountDto){
        let account = await this.accountsService.getAccountByEmail(dto.email);
        if(account != null) throw new HttpException("Такой аккаунт уже существует", HttpStatus.BAD_REQUEST);
        account = await this.accountsService.createAccount(dto);
        return account;
    }

    async registerUser(dto: CreateAccountUserDto){
        let account = await this.register(new CreateAccountDto(dto.email, dto.password));
        this.usersService.createUser(new CreateUserDto(account.id, dto.login));
        return this.generateToken(account);
    }

    async registerCompany(dto: CreateAccountCompanyDto){
        let account = await this.register(new CreateAccountDto(dto.email, dto.password));
        this.companiesService.create(new CreateCompanyDto(
            account.id,
            dto.company_name,
            dto.surname,
            dto.name,
            dto.patronymic,
            dto.phone_number,
            dto.company_type_id,
            dto.inn_file,
            dto.official_letter
        ));
        return this.generateToken(account);
    }

    private async generateToken(account: Account){
        const payload = {email: account.email, id: account.id, roles: account.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateAccount(dto: CreateAccountDto){
        const account = await this.accountsService.getAccountByEmail(dto.email);
        const passwordEqual = await bcryptjs.compare(account.password, dto.password);
        if(account && passwordEqual){
            return account;
        }
        throw new UnauthorizedException('Неверный пароль или логин');
    }
}
