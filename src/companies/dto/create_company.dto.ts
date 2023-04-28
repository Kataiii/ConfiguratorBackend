import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    id: number;

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

    constructor(id, company_name, surname, name, patronymic, phone_number, company_type_id, inn_file, official_letter){
        this.id = id;
        this.company_name = company_name;
        this.surname = surname;
        this.name = name;
        if(patronymic != null || patronymic != undefined) this.patronymic = patronymic;
        this.phone_number = phone_number;
        this.company_type_id = company_type_id;
        this.inn_file = inn_file;
        this.official_letter = official_letter;
    }
}