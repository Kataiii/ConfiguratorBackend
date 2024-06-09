import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports:[
    SequelizeModule.forFeature([Chat])
  ],
  exports:[
    ChatsService
  ]
})
export class ChatsModule {}
