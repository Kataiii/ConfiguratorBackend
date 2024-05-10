import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly id: number;

    @ApiProperty({example: 'Иван', description: 'Имя пользователя', required: false})
    readonly name?: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия пользователя', required: false})
    readonly surname?: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество пользователя', required: false})
    readonly patronomyc?: string;

    @ApiProperty({example: 1, description: 'Идентификатор города', required: false})
    readonly city_id?: number;

    @ApiProperty({example: 'Что-то написано', description: 'Информация о пользователе', required: false})
    readonly about?: string;

    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: false})
    readonly phone_number?: string;

    @ApiProperty({example: false, description: 'Получение на почту новостной рассылки', required: true})
    readonly is_spam?: boolean;

    @ApiProperty({example: false, description: 'Получение на почту уведомлений', required: true})
    readonly on_notifications?: boolean;

    @ApiProperty({example: 'login', description: 'Логин пользователя', required: true})
    readonly login?: string;
}

export class UpdateAvatarInfo{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    readonly user_id: number;
}