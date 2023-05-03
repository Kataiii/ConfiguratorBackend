import { forwardRef, Module } from '@nestjs/common';
import { ActivationLinksService } from './activation_links.service';
import { ActivationLinksController } from './activation_links.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivationLink } from './activation_links.model';
import { MailServiceModule } from '../mail-service/mail-service.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  providers: [ActivationLinksService],
  controllers: [ActivationLinksController],
  imports: [
    SequelizeModule.forFeature([ActivationLink]),
    MailServiceModule,
    forwardRef(() => AccountsModule)
  ],
  exports: [
    ActivationLinksService
  ]
})
export class ActivationLinksModule {}
