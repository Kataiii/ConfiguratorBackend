import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message) private messagesRepository: typeof Message){}

    async create(dto:CreateMessageDto){
        return await this.messagesRepository.create(dto);
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
        return await this.messagesRepository.findOne({where: {chatId: chatId, senderId: senderId, isRead: false}});
    }

    async countUnReadMessages(chatId: number, senderId: number){
        return (await this.messagesRepository.findAndCountAll({where: {chatId: chatId, senderId: senderId, isRead: false}})).count;
    }
}
