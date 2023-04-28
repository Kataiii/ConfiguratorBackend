import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: true})
    id: number;

    @ApiProperty({example: 'user', description: 'Логин сотрудника', required: true})
    login: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия сотрудника', required: true})
    surname: string;
    
    @ApiProperty({example: 'Иван', description: 'Имя сотрудника', required: true})
    name: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество сотрудника', required: false})
    patronymic?: string;
    
    @ApiProperty({example: '9603469551', description: 'Телефон пользователя без 8 и +7', required: true})
    phone_nimber: string;
    
    @ApiProperty({example: 1, description: 'Id клмпании', required: true})
    company_id: number;
}