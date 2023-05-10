import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";

interface ActivationLinkCreateAttrs{
    activation_link: string;
    account_id: number;
}

@Table({tableName: 'activation_links', createdAt: true, updatedAt: false})
export class ActivationLink extends Model<ActivationLink, ActivationLinkCreateAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    activation_link: string;

    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, unique: false})
    account_id: number;
}