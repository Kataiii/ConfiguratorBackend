import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { FolderProjects } from "src/folder-projects/folder-projects.model";
import { Project } from "src/projects/projects.model";

interface LastFolderProjectsCreateAttrs{
    project_id: number;
    last_folder_id: number;
}

@Table({tableName: 'last_folder-projects', createdAt: false, updatedAt: false})
export class LastFolderProjects extends Model<LastFolderProjects, LastFolderProjectsCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'Id проекта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Project)
    project_id: number;

    @ApiProperty({example: 1, description: 'Id предыдущей папки', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => FolderProjects)
    last_folder_id: number;
}