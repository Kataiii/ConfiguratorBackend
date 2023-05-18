import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto{
    @ApiProperty({example: 'Дом', description: 'Название проекта', required: true})
    name: string;

    @ApiProperty({example: 1, description: 'Id типа строения', required: true})
    construction_type_id: number;

    @ApiProperty({example: 1, description: 'Количество этажей', required: true})
    floor_number: number;

    @ApiProperty({example: 1, description: 'Id папки', required: true})
    folder_id: number;
}