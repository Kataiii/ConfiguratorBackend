import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AccountsModule } from 'src/accounts/accounts.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { FolderProjectsModule } from 'src/folder-projects/folder-projects.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { ActivationLinksModule } from './activation_links/activation_links.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailServiceModule } from './mail-service/mail-service.module';
import { RecoveryLinksModule } from './recovery_links/recovery_links.module';
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
    FolderProjectsModule,
    RecoveryLinksModule,
    RolesModule
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
