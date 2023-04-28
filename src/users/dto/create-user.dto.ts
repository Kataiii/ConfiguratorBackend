import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly id: number;

    @ApiProperty({example: 'user', description: 'Логин пользователя', required: true})
    readonly login: string;

    constructor(id, login){
        this.id = id;
        this.login = login;
    }
}