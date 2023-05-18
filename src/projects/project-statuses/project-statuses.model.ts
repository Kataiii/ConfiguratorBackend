import { Model, Column, DataType, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";


interface ProjectStatusesCreationAttrs{
    name: string;
}

@Table({tableName: 'project_statuses', createdAt: false, updatedAt: false})
export class ProjectStatuses extends Model<ProjectStatuses, ProjectStatusesCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'На просчете', description: 'Название статуса', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}