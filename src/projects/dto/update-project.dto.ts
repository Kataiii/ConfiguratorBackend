import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto{
    @ApiProperty({example: 1, description: 'Id папки', required: true})
    id: number;

    @ApiProperty({example: "Дом", description: 'Название папки', required: false})
    name?: string;

    @ApiProperty({example: 1, description: 'Id папки', required: false})
    folder_id?: number;

    @ApiProperty({example: 'picture.png', description: 'Путь к файлу картинки', required: false})
    preview?: string;

    @ApiProperty({example: 'save.какое-то расширение', description: 'Путь к расположению файла', required: false})
    save_file?: string;
}