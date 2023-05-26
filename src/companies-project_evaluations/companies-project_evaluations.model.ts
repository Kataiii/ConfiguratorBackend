import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProjectStatuses } from "src/projects/project-statuses/project-statuses.model";

interface CreateCompaniesProjectEvaluationsAttrs{
    company_id: number;
    project_evaluation_id: number;
    status_id: number;
}

@Table({tableName: 'companies_project_evaluations'})
export class CompaniesProjectEvaluations extends Model<CompaniesProjectEvaluations, CreateCompaniesProjectEvaluationsAttrs>{
    @ApiProperty({example: 1, description: 'Id компании', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false, primaryKey: true})
    company_id: number;

    @ApiProperty({example: 1, description: 'Id выложенного проекта', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false, primaryKey: true})
    project_evaluation_id: number;
    
    @ApiProperty({example: 1, description: 'Id статуса', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => ProjectStatuses)
    status_id: number;
}