import { ApiProperty } from "@nestjs/swagger";

export class UpdateFolderProjectsDto{
    @ApiProperty({example: 1, description: 'Id папки', required: true})
    id: number;

    @ApiProperty({example: "Дом", description: 'Название папки', required: true})
    name: string;
}