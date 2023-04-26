import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { Role } from "src/roles/roles.model";

interface AccountCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'accounts'})
export class Account extends Model<Account, AccountCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique:true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string; //массив байтов

    @ForeignKey(() => City)
    @Column({type: DataType.INTEGER})
    city_id: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_spam: boolean;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, defaultValue: 2})
    role_id: number;

    @Column({type: DataType.STRING, allowNull: true})
    profile_picture: string; //Хранение картинок
}