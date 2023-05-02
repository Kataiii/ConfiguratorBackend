import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { Role } from "src/roles/roles.model";


@Table({tableName: 'account_roles', createdAt: false, updatedAt: false})
export class AccountRoles extends Model<AccountRoles>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    account_id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    role_id: number;
}