import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CompanyTypeCreationAttrs{
    name: string;
}

@Table({tableName: 'company_types', createdAt: false, updatedAt: false})
export class CompanyType extends Model<CompanyType, CompanyTypeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Охранный', description: 'Тип компании', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}