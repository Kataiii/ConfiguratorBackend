import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Account } from './account.model';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BanAccountDto } from './dto/ban-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountNotifications } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountRepository: typeof Account,
         private rolesService: RolesService){}

    async createAccount(dto: CreateAccountDto){
        const account = await this.accountRepository.create(dto);
        const role = await this.rolesService.getRoleByName('user');
        await account.$set('roles', [role.id]);
        account.roles = [role];
        return await this.accountRepository.findOne({where: {email: dto.email}, include: {all: true}});
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
            is_spam: account.is_spam
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

    async updateNotifications(dto: UpdateAccountNotifications){
        return await this.accountRepository.update(dto, {where: {id: dto.id}});
    }
}
