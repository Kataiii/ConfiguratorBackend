import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/accounts/account.model';
import { Token } from './tokens.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokensService {
    constructor(@InjectModel(Token) private tokensRepository: typeof Token){}

    generateRefreshToken(account: Account): string{
        const payload = {email: account.email, id: account.id, roles: account.roles}
        return jwt.sign(payload, process.env.PRIVATE_KEY_REFRESH, {expiresIn: '30d'});
    }

    async saveRefreshToken(refresh_token: string, account_id: number, ip: string){
        const tokens = await this.tokensRepository.findAll({where: {account_id: account_id}});
        const deleteTokens = tokens.filter(token => Date.now() - token.createdAt >= 30);
        for(let i: number = 0; i < deleteTokens.length; i++){
            await this.tokensRepository.destroy({where: {id: deleteTokens[i].id}});
        }

        const token = await this.tokensRepository.create({
            refresh_token: refresh_token,
            account_id: account_id,
            ip: ip
        });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.tokensRepository.destroy({ where: { refresh_token: String(refreshToken) } });
        return tokenData;
    }

    async validateRefreshToken(refreshToken){
        try{
            const accountData = <jwt.JwtPayload>jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH);
            return accountData;
        } catch(e){
            return null;
        }
    }

    async findRefreshToken(refreshToken){
        const tokenData = await this.tokensRepository.findOne({where: {refresh_token: refreshToken}});
        return tokenData;
    }
}
