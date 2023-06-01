import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountCompanyDto{
    @ApiProperty({example: 'user@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: 'Qwerty123*', description: 'Пароль', required: true})
    readonly password: string;

    @ApiProperty({example: 'NotCreativeLab', description: 'Имя компании', required: true})
    company_name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия контактного лица', required: true})
    surname: string;

    @ApiProperty({example: 'Иван', description: 'Имя контактного лица', required: true})
    name: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество контактного лица', required : false})
    patronymic?: string;

    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: true})
    phone_number: string;

    @ApiProperty({example: 1, description: 'Id типа компании', required: true})
    company_type_id: number;

    @ApiProperty({example: 'inn.png', description: 'Строка загрузки файла с инн', required: true})
    inn_file: string;

    @ApiProperty({example: 'official_letter.png', description: 'Строка загрузки файла с письмом компании', required: true})
    official_letter: string;

    @ApiProperty({example: true, description: 'Подписка на новостную рассылку', required: true})
    is_spam: boolean;
}