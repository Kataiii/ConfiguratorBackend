import { ApiProperty } from "@nestjs/swagger";
import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { City } from "src/cities/cities.model";

interface UserCreationAttr{
    id: number;
    login: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'login', description: 'Логин пользователя', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    login: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия пользователя', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    surname: string;

    @ApiProperty({example: 'Иван', description: 'Имя пользователя', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    name: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество пользователя', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    patronymic: string;

    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    phone_number: string;

    @ApiProperty({example: false, description: 'Проверка телефона', required: false})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    is_checked_phone: boolean; 

    @ApiProperty({example: 1, description: 'Идентификатор города', required: false})
    @ForeignKey(() => City)
    @Column({type: DataType.INTEGER})
    city_id: number;

    @ApiProperty({example: 'image.png', description: 'Строка загрузки картинки', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    profile_picture: string;

    @ApiProperty({example: 'Что-то написано', description: 'Информация о пользователе', required: false})
    @Column({type: DataType.TEXT, unique: false, allowNull: true})
    about: string;
}