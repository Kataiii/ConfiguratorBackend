import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountCompanyDto } from 'src/accounts/dto/create-account-company.dto';
import { CreateAccountUserDto } from 'src/accounts/dto/create-account-user.dto';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AuthService } from './auth.service';
import { Token } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @ApiOperation({summary: 'Log in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 401, description: 'Неверный пароль или логин'})
    @Post('/login')
    login(@Body() dto : CreateAccountDto){
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Registration user in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @Post('/register/user')
    registerUser(@Body() dto: CreateAccountUserDto){
        return this.authService.registerUser(dto);
    }

    @ApiOperation({summary: 'Registration company in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @Post('register/company')
    registerCompany(@Body() dto: CreateAccountCompanyDto){
        return this.authService.registerCompany(dto);
    }
}
