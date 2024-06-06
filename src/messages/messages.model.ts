import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { Chat } from "src/chats/chats.model";
import { Role } from "src/roles/roles.model";


interface MessageCreationAttrs{
    chatId: number;
    senderId: number;
    roleSenderId: number;
    content: string;
    isRead:boolean;
}

@Table({tableName: 'messages', createdAt: true, updatedAt: true})
export class Message extends Model<Message, MessageCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Chat)
    @ApiProperty({example: 1, description: 'Id chat', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    chatId: number;

    @ForeignKey(() => Account)
    @ApiProperty({example: 1, description: 'Id sender', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    senderId: number;

    @ForeignKey(() => Role)
    @ApiProperty({example: 1, description: 'Id role sender', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    roleSenderId: number;

    @ApiProperty({example: "hello", description: "content in message", required: true})
    @Column({type : DataType.STRING, unique: false, allowNull: false})
    content: string;

    @ApiProperty({example: true, description: "is read message", required: true})
    @Column({type: DataType.BOOLEAN, unique: false, allowNull: false})
    isRead: boolean;
}