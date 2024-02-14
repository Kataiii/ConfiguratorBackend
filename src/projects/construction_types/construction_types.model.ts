import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ConstructionTypeCreateAttrs{
    name: string;
}

@Table({tableName: 'construction_types', updatedAt: false, createdAt: false})
export class ConstructionType extends Model<ConstructionType, ConstructionTypeCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Гараж', description: 'Название типа строения', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;
}