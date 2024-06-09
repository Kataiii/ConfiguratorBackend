import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatsModule } from 'src/chats/chats.module';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';
import { MessageGateway } from './messages.gateway';

@Module({
  providers: [MessagesService, MessageGateway],
  controllers: [MessagesController],
  imports: [
    SequelizeModule.forFeature([Message]),
    forwardRef(() => ChatsModule)
  ],
  exports: [
    MessagesService
  ]
})
export class MessagesModule {}
