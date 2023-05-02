import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { AccountRoles } from 'src/account-roles/account-roles.model';
import { Account } from './account.model';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    SequelizeModule.forFeature([Account, Role, AccountRoles]),
    RolesModule,
    UsersModule,
    CompaniesModule,
    AuthModule
  ],
  exports: [
    AccountsService
  ]
})
export class AccountsModule {}
