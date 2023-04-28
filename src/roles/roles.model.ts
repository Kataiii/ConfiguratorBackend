import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { AccountRoles } from "src/account-roles/account-roles.model";
import { ApiProperty } from "@nestjs/swagger";


interface RoleCreationAttrs{
    name: string;
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user', description: 'Название роли', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @BelongsToMany(() => Account, () => AccountRoles)
    accounts: Account[];
}