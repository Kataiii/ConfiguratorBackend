import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BOOLEAN } from 'sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@ApiTags("Messages")
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService){}

    @ApiOperation({summary: 'Create message'})
    @ApiResponse({status: 201, type: Message})
    @Post()
    async create(@Body() dto: CreateMessageDto){
        return await this.messagesService.create(dto);
    }

    @ApiOperation({summary: 'Check unread messages'})
    @ApiResponse({status: 200, type: BOOLEAN})
    @Get("/check_unread/:accountId/:typeRole")
    async checkUnreadMessages(@Param("accountId") accountId: number, @Param("typeRole") typeRole: string){
        return await this.messagesService.checkUnReadMessage(accountId, typeRole);
    }

    @ApiOperation({summary: 'Get messages by chat id'})
    @ApiResponse({status: 200, type: [Message]})
    @Get("/:id")
    async getChatById(@Param("id") id: number){
        return await this.messagesService.getMessagesByChatId(id);
    }

    @ApiOperation({summary: "Get info for chat"})
    @ApiResponse({status: 200})
    @Get("/chat_info/:chatId/:senderId")
    async getChatInfo(@Param("chatId") chatId: number, @Param("senderId") senderId: number){
        const message = await this.messagesService.findFirstUnReadMessage(chatId, senderId);
        const count = await this.messagesService.countUnReadMessages(chatId, senderId);
        return {
            message: message,
            count: count
        }
    }
}
