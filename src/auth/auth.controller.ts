import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/login')
    login(@Body() dto : CreateAccountDto){
        return this.authService.login(dto);
    }
}
