import { ApiProperty } from "@nestjs/swagger";

export class SaveFilesDto {
    @ApiProperty({ example: "1", description: 'id пользователя', required: true })
    idUser: string | number;

    @ApiProperty({ example: "1", description: 'id проекта', required: true })
    idProject: string | number;

    @ApiProperty({example: "users", description: 'тип роли', required: true})
    typeRole: string;

    @ApiProperty({ example: "image.png", description: 'картинка файл', required: true })
    thum: File;

    @ApiProperty({ example: "txt.json", description: 'json-файл', required: true })
    json: File;
}