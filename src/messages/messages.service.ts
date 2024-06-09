import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { ChatsService } from 'src/chats/chats.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message) private messagesRepository: typeof Message,
        private chatsService: ChatsService,
        private eventEmitter: EventEmitter2
        ){}

    async create(dto:CreateMessageDto){
        const message = await this.messagesRepository.create(dto);
        this.eventEmitter.emit(
            "message.create",
            message
        );
        return message;
    }

    async getMessagesByChatId(chatId: number){
        return await this.messagesRepository.findAll({where: {chatId: chatId}});
    }

    async update(dto: UpdateMessageDto){
        await this.messagesRepository.update(dto, {where: {id: dto.id}});
        return await this.messagesRepository.findOne({where: {id: dto.id}});
    }

    async getPaggination(chatId: number, page: number, limit: number){
        return await this.messagesRepository.findAll({
            where:{
                chatId: chatId
            },
            limit: limit,
            offset: (page - 1)*limit,
            order: [["createdAt", "ASC"]]
        })
    }

    async findFirstUnReadMessage(chatId: number, senderId: number){
        return await this.messagesRepository.findOne({where: {chatId: chatId, senderId: senderId, isRead: false}, order: [["createdAt", "DESC"]]});
    }

    async countUnReadMessages(chatId: number, senderId: number){
        return (await this.messagesRepository.findAndCountAll({where: {chatId: chatId, senderId: senderId, isRead: false}})).count;
    }

    @OnEvent('message.created', { async: true })
    async checkUnReadMessage(accountId: number, typeRole: string){
        EventEmitter2.once(this.eventEmitter, "message.created", {
            timeout: 0,
            Promise: async() => {
                const response = await this.chatsService.getAllChatsAccountByRole(accountId, typeRole);
                response.forEach(item => {
                    const messagesResponse = this.getMessagesByChatId(item.id);
                    messagesResponse.then(messages => {
                        messages = messages.filter(item => item.senderId != accountId && !item.isRead);
                        if(messages.length !== 0) return true;
                    })
                })
                return false;
            },
            overload: false
        });
    }

    // @OnEvent('message.created', { async: true })
    // async handleMessageCreatedEvent(payload: Message) {
    //     const chat = await this.chatsService.getChatById(payload.chatId);
    //     return await this.checkUnReadMessage(
    //         payload.roleSenderId === 4 ? chat.companyId : chat.userId,
    //         payload.roleSenderId === 4 ? "company" : "user"
    //     )
    // }
}
