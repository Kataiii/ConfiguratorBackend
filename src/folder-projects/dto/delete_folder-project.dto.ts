import { ApiProperty } from "@nestjs/swagger";

export class DeletFolderProjectsDto{
    @ApiProperty({example: 1, description: 'Id папки', required: true})
    id: number;
}