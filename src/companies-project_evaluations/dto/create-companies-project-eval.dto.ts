import { ApiProperty } from "@nestjs/swagger";

export class CreateCompaniesProjectEvalDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор компании', required: true})
    company_id: number;

    @ApiProperty({example: 1, description: 'Уникальный идентификатор копии проекта', required: true})
    project_evaluation_id: number;

    @ApiProperty({example: 1, description: 'Статус', required: true})
    status_id: number;
}