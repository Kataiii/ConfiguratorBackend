import { ApiProperty } from "@nestjs/swagger";


export class ProjectResource{
    @ApiProperty({example: 1, description: 'Id проекта', required: true})
    id: number;

    @ApiProperty({example: 'Проект 1', description: 'Название проекта', required: true})
    name: string;

    @ApiProperty({example: 'picture1.jpg', description: 'Ссылка на картинку', required: false})
    preview?: string;

    @ApiProperty({example: 1, description: 'Id папкаи', required: true})
    folder_id: number;
}