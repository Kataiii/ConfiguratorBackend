import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BOOLEAN } from 'sequelize';
import { Chat } from './chats.model';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags("Chats")
@Controller('chats')
export class ChatsController {
    constructor(private chatsService: ChatsService){}

    @ApiOperation({summary: 'Create chat'})
    @ApiResponse({status: 201, type: Chat})
    @Post()
    async create(@Body() dto: CreateChatDto){
        return await this.chatsService.create(dto);
    }

    @ApiOperation({summary: 'Get chats for account id'})
    @ApiResponse({status: 201, type: Chat})
    @Get("/:accountId/:typeRole")
    async getAllChatsAccountByRole(@Param("accountId") accountId: number, @Param("typeRole") typeRole: string){
        return await this.chatsService.getAllChatsAccountByRole(accountId, typeRole);
    }

    @ApiOperation({summary: "Get chat by id"})
    @ApiResponse({status: 200, type: Chat})
    @Get("/:id")
    async getChatById(@Param("id") id: number){
        return await this.chatsService.getChatById(id);
    }

    @ApiOperation({summary: 'Check chat and account'})
    @ApiResponse({status: 200, type: BOOLEAN})
    @Get("/check/:chatId/:accountId")
    async checkChat(@Param("chatId") chatId: number, @Param("accountId") accountId: number){
        return await this.chatsService.checkChat(chatId, accountId);
    }
}
