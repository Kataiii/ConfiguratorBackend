import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { City } from "src/cities/cities.model";
import { Role } from "src/roles/roles.model";


@Table({tableName: 'account_roles', createdAt: false, updatedAt: false})
export class AccountRoles extends Model<AccountRoles>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER})
    account_id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number;
}