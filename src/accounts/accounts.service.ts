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
import { UpdateRoleDto } from './dto/update-role.dto';
import { BanAccountDto } from './dto/ban-account.dto';
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

    async update(account_id: number){
        const accountUpdated = await this.accountRepository.update({is_checked_email: true}, {where: {id: account_id}});
        return accountUpdated;
    }

    async fullUpdate(account: Account){
        const accountUpdated = await this.accountRepository.update({
            email: account.email,
            is_checked_email: account.is_checked_email,
            password: account.password,
            city_id: account.city_id,
            is_spam: account.is_spam,
            profile_picture: account.profile_picture
        }, {where: {id: account.id}});
        return accountUpdated;
    }

    async addRole(dto: UpdateRoleDto) {
        const account = await this.getAccountById(dto.account_id);
        const role = await this.rolesService.getRoleByName(dto.value);
        if(role && account){
            await account.$add('roles', role.id);
            return await this.getAccountById(dto.account_id);
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async deleteRole(dto: UpdateRoleDto){
        const account = await this.getAccountById(dto.account_id);
        const role = await this.rolesService.getRoleByName(dto.value);
        if(role && account){
            await account.$remove('roles', role.id);
            return await this.getAccountById(dto.account_id);
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async addRoleForCompany(account_id: number){
        await this.addRole({value: 'company', account_id: account_id});
        await this.deleteRole({value: 'user', account_id: account_id});
        return account_id;
    }

    async ban(dto: BanAccountDto) {
        const account = await this.getAccountById(dto.account_id);
        //TODO сделать таблицу забаненных пользователей
        return account;
    }
}
