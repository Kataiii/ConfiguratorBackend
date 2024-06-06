import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
    constructor(@InjectModel(Chat) private chatsRepository: typeof Chat){}

    async create(dto: CreateChatDto){
        return await this.chatsRepository.create(dto);
    }

    async getAllChatsAccountByRole(accountId: number, typeRole: string){
        if(typeRole === "company") return await this.chatsRepository.findAll({where:{companyId: accountId}});
        return await this.chatsRepository.findAll({where:{userId: accountId}});
    }
}
