import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CompanyType } from "./company_types/company_types.model";

interface CompanyCreationAttrs{
    id: number;
    company_name: string;
    surname: string;
    name: string;
    patronymic?: string;
    phone_number: string;
    company_type_id: number;
    inn_file: string;
    official_letter: string;
    is_spam: boolean;
}

@Table({tableName: 'companies'})
export class Company extends Model<Company, CompanyCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'NotCreativeLab', description: 'Имя компании', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    company_name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия контактного лица', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Иван', description: 'Имя контактного лица', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество контактного лица', required : false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    patronymic: string;

    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    phone_number: string;

    @ForeignKey(() => CompanyType)
    @ApiProperty({example: 1, description: 'Id типа компании', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    company_type_id: number;

    @ApiProperty({example: 'inn.png', description: 'Строка загрузки файла с инн', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    inn_file: string;

    @ApiProperty({example: false, description: 'Проверка письма инн', required: false})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    is_checked_inn: boolean;

    @ApiProperty({example: 'official_letter.png', description: 'Строка загрузки файла с письмом компании', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    official_letter: string;

    @ApiProperty({example: false, description: 'Проверка письма компании', required: false})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    is_checked_official_letter: boolean;

    @ApiProperty({example: 'Что-то написано', description: 'Информация о компании', required: false})
    @Column({type: DataType.TEXT, unique: false, allowNull: true})
    about_company: string;
}