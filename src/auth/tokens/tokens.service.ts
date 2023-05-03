import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/accounts/account.model';
import { Token } from './tokens.model';

@Injectable()
export class TokensService {
    constructor(@InjectModel(Token) private tokensRepository: typeof Token,
        private jwtService: JwtService){}

    //TODO создание refresh токена
    generateRefreshToken(account: Account): string{
        const payload = {email: account.email, id: account.id, roles: account.roles}
        return this.jwtService.sign(payload);
    }

    async saveRefreshToken(refresh_token: string, account_id: number, ip: string){
        //Найти все токены по id пользователя и посмотреть какие уже умерли, все записи больше 30 дней стереть
        const token = await this.tokensRepository.create({
            refresh_token: refresh_token,
            account_id: account_id,
            ip: ip
        });
        return token;
    }
}
