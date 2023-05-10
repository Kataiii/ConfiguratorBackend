import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';

@Module({
  controllers: [],
  providers: [MailServiceService],
  imports: [],
  exports: [
    MailServiceService
  ]
})
export class MailServiceModule { }
