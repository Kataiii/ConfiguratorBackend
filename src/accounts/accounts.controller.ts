import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Account } from './account.model';
import { AccountsService } from './accounts.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BanAccountDto } from './dto/ban-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
    constructor(private accountService: AccountsService){}

    @ApiOperation({summary: 'Get all accounts'})
    @ApiResponse({ status: 200, type: [Account]})
    @ApiResponse({status: 401, description: 'Пользователь не авторизован'})
    @Get()
    @Roles('admin')
    @UseGuards(RolesAuthGuard)
    getAll(){
        const accounts = this.accountService.getAllAccounts();
        return accounts;
    }

    @ApiOperation({summary: 'Get all accounts with roles'})
    @ApiResponse({status: 200, type: [Account]})
    @ApiResponse({status: 401, description: 'Пользователь не авторизован'})
    @ApiResponse({status: 404, description: 'Аккаунты не найдены'})
    @Get('/account_with_roles')
    getAllWithRoles(){
        return this.accountService.getAllAccountsWithRoles();
    }

    @ApiOperation({summary: 'Create account'})
    @ApiResponse({ status: 200, type: Account})
    @Post()
    create(@Body() accountDto: CreateAccountDto){
        return this.accountService.createAccount(accountDto);
    }

    @ApiOperation({summary: 'Add role for account'})
    @ApiResponse({status: 200})
    @Roles('admin', 'company')
    @UseGuards(RolesAuthGuard)
    @Post('/role')
    addRole(@Body() dto: UpdateRoleDto){
        return this.accountService.addRole(dto);
    }

    @ApiOperation({summary: 'Delete role for account'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(RolesAuthGuard)
    @Post('/ban')
    ban(@Body() dto: BanAccountDto){
        return this.accountService.ban(dto);
    }
}
