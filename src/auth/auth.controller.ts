import { Controller, Post, Get, Body, Ip, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountCompanyDto } from 'src/accounts/dto/create-account-company.dto';
import { CreateAccountUserDto } from 'src/accounts/dto/create-account-user.dto';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AuthService } from './auth.service';
import { Token } from './dto/token.dto';
import { Public } from './guards/decorators/public.decorator';
import { Request, response, Response } from 'express';
import { Req, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import {stringify} from 'flatted';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Account } from 'src/accounts/account.model';
import { EmailDto } from './dto/email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @ApiOperation({summary: 'Log in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 401, description: 'Неверный пароль или логин'})
    @Public()
    @Post('/login')
    async login(@Body() dto : CreateAccountDto, @Res({ passthrough: true }) response: Response, @Ip() ip){
        let tokens = await this.authService.login(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return tokens;
    }

    @ApiOperation({summary: 'Registration user in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @Public()
    @Post('/register/user')
    async registerUser(@Body() dto: CreateAccountUserDto,  @Ip() ip, @Res({ passthrough: true }) response: Response){
        console.log(dto);
        let tokens = await this.authService.registerUser(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return tokens;
    }

    @ApiOperation({summary: 'Registration company in system'})
    @ApiResponse({ status: 200, type: Token})
    @ApiResponse({status: 400, description: 'Такой аккаунт уже существует'})
    @UseInterceptors(FilesInterceptor('files'))
    @Public()
    @Post('register/company')
    async registerCompany(@Body() dto: CreateAccountCompanyDto,  @Ip() ip, @Res({ passthrough: true }) response: Response, @UploadedFiles() files){
        console.log(files);
        let tokens = await this.authService.registerCompany(dto, ip, files);
        response.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return tokens;
    }

    @ApiOperation({summary: 'Log out of the system'})
    @Post('/logout')
    @Public()
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response){
        let refreshToken = request.cookies;
        const token = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        // return response.redirect(process.env.CLIENT_URL);
        return HttpStatus.OK;
    }

    @ApiOperation({summary: 'Refresh token'})
    @ApiResponse({status: 200, type: Token})
    @Post('/refresh')
    @Public()
    async refresh(@Req() request: Request, @Ip() ip){
        const refresh = request.cookies;
        let refreshToken = stringify(refresh);
        refreshToken = refreshToken.slice(refreshToken.indexOf(",")+2, refreshToken.length - 2);
 
        if(!refreshToken){
            throw new UnauthorizedException;
        }
        return await this.authService.refresh(refreshToken, ip);
    }

    @ApiOperation({summary: 'Recovery password, send letter'})
    @ApiResponse({status: 200, type: Account})
    @Post('/recovery')
    @Public()
    async recoveryPassword(@Body() dto:EmailDto){
        console.log('email', dto.email);
        return await this.authService.recoveryPassword(dto.email);
    }
}
