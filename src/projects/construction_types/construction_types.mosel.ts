import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ConstructionTypeCreateAttrs{
    name: string;
}

@Table({tableName: 'construction_types'})
export class ConstructionType extends Model<ConstructionType, ConstructionTypeCreateAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;
}