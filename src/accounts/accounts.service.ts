import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Account } from './account.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountRepository: typeof Account,
         private roleService: RolesService){}

    async createAccount(dto: CreateAccountDto){
        const account = await this.accountRepository.create(dto);
        const role = await this.roleService.getRoleByName('user');
        await account.$set('roles', [role.id]);
        return account;
    }

    async getAllAccounts(){
        const accounts = await this.accountRepository.findAll();
        return accounts;
    }

    async getAllAccountsWithRoles(){
        const accounts = await this.accountRepository.findAll({include: {all: true}});
        return accounts;
    }
}
