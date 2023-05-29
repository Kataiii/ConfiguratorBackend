import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Пароль', required: true})
    readonly password: string;

    @ApiProperty({example: true, description: 'Соглашение на пользовательскую рассылку', required: false})
    readonly is_spam: boolean;

    constructor(email, password, is_spam){
        this.email = email;
        this.password = password;
        this.is_spam = is_spam;
    }
}