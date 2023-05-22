import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { User } from "src/users/users.model";
import { Project } from "../projects.model";

interface ProjectEvaluationsCreateAttrs{
    project_id: number;
    description?: string;
    city_id: number;
    area_size: number;
    user_id: number;
}

@Table({tableName: 'project_evaluations'})
export class ProjectEvaluations extends Model<ProjectEvaluations, ProjectEvaluationsCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'Id проекта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Project)
    project_id: number;

    @ApiProperty({example: 'Описание какого-то проекта', description: 'Описание, пожелания о проекте', required: false})
    @Column({type: DataType.TEXT, unique: false, allowNull: true})
    description: string;

    @ApiProperty({example: 1, description: 'Id города', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => City)
    city_id: number;

    @ApiProperty({example: 56, description: 'Площадь проекта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    area_size: number;

    @ApiProperty({example: 1, description: 'Id пользователя', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;
}