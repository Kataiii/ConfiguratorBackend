import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Account } from './account.model';
import { AccountsService } from './accounts.service';
import { CreateAccountCompanyDto } from './dto/create-account-company.dto';
import { CreateAccountUserDto } from './dto/create-account-user.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
    constructor(private accountService: AccountsService){}

    @ApiOperation({summary: 'Get all accounts'})
    @ApiResponse({ status: 200, type: [Account]})
    @Get()
    getAll(){
        const accounts = this.accountService.getAllAccounts();
        return this.accountService.getAllAccounts();
    }

    @ApiOperation({summary: 'Get all accounts with roles'})
    @ApiResponse({status: 200, type: [Account]})
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

    // @ApiOperation({summary: 'Create account with user'})
    // @ApiResponse({status: 200, type: Account})
    // @Post('/create_with_user')
    // createAccountWithUser(@Body() accountWithUserDto: CreateAccountUserDto){
    //     return this.accountService.createAccountWithUser(accountWithUserDto);
    // }

    // @ApiOperation({summary: 'Create account with company'})
    // @ApiResponse({status: 200, type: Account})
    // @Post('/create_with_company')
    // createAccountWithCompany(@Body() accountWithCompanyDto: CreateAccountCompanyDto){
    //     return this.accountService.createAccountWithCompany(accountWithCompanyDto);
    // }
}
