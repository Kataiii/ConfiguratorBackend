import { Controller, Post, Get, Body, Ip, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountCompanyDto } from 'src/accounts/dto/create-account-company.dto';
import { CreateAccountUserDto } from 'src/accounts/dto/create-account-user.dto';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AuthService } from './auth.service';
import { Token } from './dto/token.dto';
import { Public } from './guards/decorators/public.decorator';
import { Request, response, Response } from 'express';
import { Req } from '@nestjs/common/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @ApiOperation({summary: 'Log in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 401, description: 'Неверный пароль или логин'})
    @Public()
    @Post('/login')
    login(@Body() dto : CreateAccountDto){
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Registration user in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @Public()
    @Post('/register/user')
    async registerUser(@Body() dto: CreateAccountUserDto,  @Ip() ip, @Res({ passthrough: true }) response: Response){
        let tokens = await this.authService.registerUser(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return tokens;
    }

    @ApiOperation({summary: 'Registration company in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @Public()
    @Post('register/company')
    async registerCompany(@Body() dto: CreateAccountCompanyDto,  @Ip() ip, @Res({ passthrough: true }) response: Response){
        let tokens = await this.authService.registerCompany(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return tokens;
    }

    @ApiOperation({summary: 'Log out of the system'})
    @ApiResponse({status: 200, type: Token})
    @Get('/logout')
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response){
        let refreshToken = request.cookies;
        const token = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return token;
    }
}
