import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/projects/projects.model";

export class PrejectEvalutionsResponse{
    @ApiProperty({example: 1, description: 'проект', required: true})
    project: Project

    @ApiProperty({example: 'Какое-то описание', description: 'Описание проекта', required: true})
    description?: string;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор города', required: true})
    city_id: number;

    @ApiProperty({example: 1, description: 'Площадь', required: true})
    area_size: number;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор пользователя', required: true})
    user_id: number;
}