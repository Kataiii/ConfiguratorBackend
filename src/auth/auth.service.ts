import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import * as bcryptjs from 'bcryptjs';
import { Account } from 'src/accounts/account.model';
import { CreateAccountUserDto } from 'src/accounts/dto/create-account-user.dto';

@Injectable()
export class AuthService {
    constructor(private accountsService: AccountsService,
        private jwtService: JwtService){}

    async login(dto: CreateAccountDto){
        const account = await this.validateAccount(dto);
        return this.generateToken(account);
    }

    async register(dto: CreateAccountDto){
        let account = await this.accountsService.getAccountByEmail(dto.email);
        if(account != null) throw new HttpException("Такой аккаунт уже существует", HttpStatus.BAD_REQUEST);
        account = await this.accountsService.createAccount(dto);
        return account;
    }

    async registerUser(dto: CreateAccountUserDto){
        //TODO взять метод из account service
        // const account = this.register(new CreateAccountDto(dto.email, dto.password));
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
