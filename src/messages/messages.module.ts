import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [
    SequelizeModule.forFeature([Message])
  ]
})
export class MessagesModule {}
