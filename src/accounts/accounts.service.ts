import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountRepository: typeof Account){}

    async createAccount(dto: CreateAccountDto){
        const account = await this.accountRepository.create(dto);
        return account;
    }

    async getAllAccounts(){
        const accounts = await this.accountRepository.findAll();
        return accounts;
    }
}
