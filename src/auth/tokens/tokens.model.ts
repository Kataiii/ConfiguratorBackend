import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/account.model";

interface TokenCreateAttrs{
    refresh_token: string;
    account_id: number;
    ip: string;
}

@Table({tableName: 'refresh_tokens'})
export class Token extends Model<Token, TokenCreateAttrs>{
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false})
    refresh_token: string;

    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, unique: false})
    account_id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    ip: string;
}