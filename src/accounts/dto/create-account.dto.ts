import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Пароль', required: true})
    readonly password: string;
}