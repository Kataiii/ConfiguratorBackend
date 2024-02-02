import { ApiProperty } from "@nestjs/swagger";

export class CreateFolderProjectsDto{
    @ApiProperty({example: "Дом", description: 'Название папки', required: true})
    name: string;

    @ApiProperty({example: 1, description: 'Id аккаунта', required: true})
    account_id: number;

    @ApiProperty({example: 1, description: 'Id роли', required: true})
    role_id: number;
}