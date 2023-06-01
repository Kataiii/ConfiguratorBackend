import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";

interface RecoveryLinkCreateAttrs{
    recovery_link: string;
    account_id: number;
}

@Table({tableName: 'recovery_links', createdAt: true, updatedAt: false})
export class RecoveryLink extends Model<RecoveryLink, RecoveryLinkCreateAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    recovery_link: string;

    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, unique: false})
    account_id: number;
}