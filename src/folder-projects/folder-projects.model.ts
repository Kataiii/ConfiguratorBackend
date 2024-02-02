import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { Role } from "src/roles/roles.model";

interface FolderProjectsCreateAttrs{
    name: string;
    account_id: number;
}

@Table({tableName: 'folder_projects'})
export class FolderProjects extends Model<FolderProjects, FolderProjectsCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Дом", description: 'Название папки', required: true})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @ApiProperty({example: 1, description: 'Id аккаунта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Account)
    account_id: number;

    @ApiProperty({example: 1, description: 'Id роли аккаунта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Role)
    role_id: number;
}