import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from 'src/accounts/accounts.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef(() => AccountsModule),
    UsersModule,
    CompaniesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        //TODO переправить на 10 минут
        expiresIn: '2h'
      }
    })
  ],
  exports: [
    AuthModule,
    JwtModule
  ]
})
export class AuthModule {}
