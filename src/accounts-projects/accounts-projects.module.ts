import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AccountsProjectsService } from './accounts-projects.service';
import { AccountsProjects } from './accounts-ptojects.model';

@Module({
  providers: [AccountsProjectsService],
  imports: [
    SequelizeModule.forFeature([AccountsProjects])
  ],
  exports: [
    AccountsProjectsService
  ]
})
export class AccountsProjectsModule {}
