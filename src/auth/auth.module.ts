import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from 'src/accounts/accounts.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { ActivationLinksModule } from './activation_links/activation_links.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailServiceModule } from './mail-service/mail-service.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef(() => AccountsModule),
    UsersModule,
    CompaniesModule,
    ActivationLinksModule,
    TokensModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '15m'
      }
    })
  ],
  exports: [
    AuthModule,
    JwtModule
  ]
})
export class AuthModule {}
