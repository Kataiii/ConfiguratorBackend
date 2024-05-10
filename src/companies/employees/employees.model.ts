import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "../companies.model";

interface EmployeeCreationAttrs{
    id: number;
    login: string;
    surname: string;
    name: string;
    patronymic?: string;
    phone_number: string;
    company_id: number;
}

@Table({tableName: 'employees'})
export class Employee extends Model<Employee, EmployeeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'login', description: 'Логин сотрудника', required: true})
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
    patronymic?: string;

    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    phone_number: string;

    @ApiProperty({example: false, description: 'Проверка телефона', required: false})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    is_checked_phone: boolean; 

    @ApiProperty({example: 1, description: 'Id компании', required: false})
    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    company_id: number;

    @ApiProperty({example: 'image.png', description: 'Строка загрузки картинки', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    profile_picture: string;
}