import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/accounts/account.model';
import { AccountRoles } from 'src/account-roles/account-roles.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, Account, AccountRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
