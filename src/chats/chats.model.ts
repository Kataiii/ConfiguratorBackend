import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "src/companies/companies.model";
import { User } from "src/users/users.model";


interface ChatCreationAttrs{
    userId: number;
    companyId: number;
}

@Table({tableName: 'chats', createdAt: true, updatedAt: true})
export class Chat extends Model<Chat, ChatCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @ApiProperty({example: 1, description: 'Id user', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    userId: number;

    @ForeignKey(() => Company)
    @ApiProperty({example: 1, description: 'Id company', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    companyId: number;
}