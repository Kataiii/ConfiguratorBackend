import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectNameDto{
    @ApiProperty({example: 'Дом', description: 'Название проекта', required: true})
    name: string;

    @ApiProperty({example: 1, description: 'Id типа строения', required: true})
    construction_type_id: number;

    @ApiProperty({example: 1, description: 'Количество этажей', required: true})
    floor_number: number;

    @ApiProperty({example: 1, description: 'Id папки', required: true})
    folder_id: number;

    @ApiProperty({example: 'save.какое-то расширение', description: 'Путь к расположению файла', required: false})
    save_file?: string;

    @ApiProperty({example: 'image.png', description: 'Путь к файлу картинки', required: false})
    preview?: string;
}