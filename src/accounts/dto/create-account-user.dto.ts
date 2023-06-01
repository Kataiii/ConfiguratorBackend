import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountUserDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Пароль', required: true})
    readonly password: string;

    @ApiProperty({example: 'user', description: 'Логин пользователя', required: true})
    readonly login: string;

    @ApiProperty({example: true, description: 'Соглашение на пользовательскую рассылку', required: false})
    readonly is_spam: boolean;
}