import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";
import { Project } from "src/projects/projects.model";
import { Role } from "src/roles/roles.model";

interface CreateAccountsProjectsAttrs{
    account_id: number;
    project_id: number;
    role_id: number;
}

@Table({tableName: 'accounts_projects', createdAt: false, updatedAt: false})
export class AccountsProjects extends Model<AccountsProjects, CreateAccountsProjectsAttrs>{
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, unique: false, primaryKey: true, allowNull: true})
    account_id: number;

    //TODO или здесь unique - true?
    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER, unique: false, primaryKey: true, allowNull: true})
    project_id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: false, primaryKey: true, allowNull: true})
    role_id:number;
}