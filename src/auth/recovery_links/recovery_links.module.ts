import { forwardRef, Module } from '@nestjs/common';
import { RecoveryLinksService } from './recovery_links.service';
import { RecoveryLinksController } from './recovery_links.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecoveryLink } from './recovery_links.model';
import { AccountsModule } from 'src/accounts/accounts.module';
import { MailServiceModule } from '../mail-service/mail-service.module';

@Module({
  providers: [RecoveryLinksService],
  controllers: [RecoveryLinksController],
  imports:[
    SequelizeModule.forFeature([RecoveryLink]),
    forwardRef(() => AccountsModule),
    MailServiceModule
  ],
  exports:[
    RecoveryLinksService
  ]
})
export class RecoveryLinksModule {}
