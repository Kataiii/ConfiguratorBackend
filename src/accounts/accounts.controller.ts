import { Controller, Post, Body, Get } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Account } from './account.model';
import { AccountsService } from './accounts.service';
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


}
