import { Controller, Post, Body, Get } from '@nestjs/common';
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
        return this.accountService.getAllAccounts();
    }

    @ApiOperation({summary: 'Create account'})
    @ApiResponse({ status: 200, type: Account})
    @Post()
    create(@Body() accountDto: CreateAccountDto){
        return this.accountService.createAccount(accountDto);
    }
}
