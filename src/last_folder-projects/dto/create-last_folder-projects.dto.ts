import { ApiProperty } from "@nestjs/swagger";

export class CreateLastFolderProjectsDto{
    @ApiProperty({example: 1, description: 'Id проекта', required: true})
    project_id: number;

    @ApiProperty({example: 1, description: 'Id папки', required: true})
    last_folder_id: number;
}