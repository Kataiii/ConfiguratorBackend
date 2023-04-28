import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Account } from './account.model';
import { CreateAccountUserDto } from './dto/create-account-user.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountRepository: typeof Account,
         private rolesService: RolesService,
         private usersService: UsersService){}

    async createAccount(dto: CreateAccountDto){
        const account = await this.accountRepository.create(dto);
        const role = await this.rolesService.getRoleByName('user');
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

    async createAccountWithUser(dto: CreateAccountUserDto){
        const dtoForAccount = new CreateAccountDto(dto.email, dto.password);
        const account = await this.createAccount(dtoForAccount);
        const dtoForUser = new CreateUserDto(account.id, dto.login);
        const user = await this.usersService.createUser(dtoForUser);
        return account;
    }
}
