import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordAccountDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly id: number;

    @ApiProperty({example: 'Qwerty123*', description: 'Старый пароль', required: true})
    readonly lastPassword?: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Новый пароль', required: true})
    readonly newPassword?: string;
}

export class UpdateEmailAccountDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    readonly email?: string;
}

export class UpdateAccountNotifications{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly id: number;

    @ApiProperty({example: false, description: 'Получение на почту новостной рассылки', required: true})
    readonly is_spam?: boolean;
    
    @ApiProperty({example: false, description: 'Получение на почту уведомлений', required: true})
    readonly on_notifications?: boolean;
}