import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { Role } from "src/roles/roles.model";

interface AccountCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'accounts'})
export class Account extends Model<Account, AccountCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    email: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Пароль', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    password: string; //массив байтов

    @ApiProperty({example: 1, description: 'Идентификатор города', required: false})
    @ForeignKey(() => City)
    @Column({type: DataType.INTEGER})
    city_id: number;

    @ApiProperty({example: false, description: 'Получение на почту уведомлений', required: false})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_spam: boolean;

    @ApiProperty({example: 1, description: 'Идентификатор роли', required: false})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, defaultValue: 2})
    role_id: number;

    @ApiProperty({example: 'image.png', description: 'Строка загрузки картинки', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    profile_picture: string; //Хранение картинок
}