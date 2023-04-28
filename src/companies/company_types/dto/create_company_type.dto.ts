import { ApiProperty } from "@nestjs/swagger";


export class CreateCompanyTypesDto{
    @ApiProperty({example: 'Охранный', description: 'Тип компании', required: true})
    readonly name : string;
}