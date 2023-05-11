import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateCompanyDto } from 'src/companies/dto/create_company.dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Account } from './account.model';
import { CreateAccountCompanyDto } from './dto/create-account-company.dto';
import { CreateAccountUserDto } from './dto/create-account-user.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountRepository: typeof Account,
         private rolesService: RolesService){}

    async createAccount(dto: CreateAccountDto){
        const account = await this.accountRepository.create(dto);
        const role = await this.rolesService.getRoleByName('user');
        await account.$set('roles', [role.id]);
        account.roles = [role];
        return account;
    }

    async getAllAccounts(){
        const accounts = await this.accountRepository.findAll();
        return accounts;
    }

    async getAllAccountsWithRoles(){
        const accounts = await this.accountRepository.findAll({include: {all: true}});
        if(accounts.length === 0) throw new HttpException({message: 'Аккаунты не найдены'}, HttpStatus.NOT_FOUND);
        return accounts;
    }

    async getAccountByEmail(email: string){
        const account = await this.accountRepository.findOne({where: {email}, include: {all: true}});
        return account;
    }

    async getAccountById(id: number){
        const account = await this.accountRepository.findOne({where: {id}, include: {all: true}});
        return account;
    }

    async Update(account: Account, account_id: number){
        const accountUpdated = await this.accountRepository.update(account, {where: {id: account_id}});
        return accountUpdated;
    }

    // async createAccountWithUser(dto: CreateAccountUserDto){
    //     const dtoForAccount = new CreateAccountDto(dto.email, dto.password);
    //     const account = await this.createAccount(dtoForAccount);
    //     const dtoForUser = new CreateUserDto(account.id, dto.login);
    //     const user = await this.usersService.createUser(dtoForUser);
    //     return account;
    // }

    // async createAccountWithCompany(dto: CreateAccountCompanyDto){
    //     const dtoForAccount = new CreateAccountDto(dto.email, dto.password);
    //     const account = await this.createAccount(dtoForAccount);
    //     const dtoForCompany = new CreateCompanyDto(
    //         account.id, 
    //         dto.company_name, 
    //         dto.surname,
    //         dto.name,
    //         dto.patronymic,
    //         dto.phone_number,
    //         dto.company_type_id,
    //         dto.inn_file,
    //         dto.official_letter);
    //     const company = await this.companiesService.create(dtoForCompany);
    //     return company;
    // }
}
