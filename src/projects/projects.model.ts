import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { FolderProjects } from "src/folder-projects/folder-projects.model";

interface ProjectCreateAttrs{
    name: string;
    construction_type_id: number;
    floor_number: number;
    preview: string;
    save_file: string;
}

@Table({tableName: 'projects'})
export class Project extends Model<Project, ProjectCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Дом', description: 'Название проекта', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @ApiProperty({example: 'image.png', description: 'Путь к файлу картинки', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    preview?: string;

    @ApiProperty({example: 1, description: 'Id типа строения', required: false})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    construction_type_id: number;
    
    @ApiProperty({example: 1, description: 'Количество этажей', required: false})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    floor_number: number;
    
    @ApiProperty({example: 'save.какое-то расширение', description: 'Путь к расположению файла', required: false})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    save_file?: string;

    @ApiProperty({example: 1, description: 'Id папки', required: false})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => FolderProjects)
    folder_id: number;
}