import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Chat } from './chats.model';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

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
}
