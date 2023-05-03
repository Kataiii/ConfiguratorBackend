import { Model, Table } from "sequelize-typescript";

interface ProjectCreateAttrs{

}

@Table({tableName: 'projects'})
export class Project extends Model<Project, ProjectCreateAttrs>{
    id: number;
    name: string;
    preview: string;
    construction_type_id: number;
    floor_number: number;
    save_file: string;
}