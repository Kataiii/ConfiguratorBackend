import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";

interface CreateAccountsProjectsAttrs{
    account_id: number;
    project_id: number;
}

@Table({tableName: 'accounts_projects', createdAt: false, updatedAt: false})
export class AccountsProjects extends Model<AccountsProjects, CreateAccountsProjectsAttrs>{
    @Column({type: DataType.INTEGER, unique: false, primaryKey: true, allowNull: true})
    account_id: number;

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, allowNull: true})
    project_id: number;
}