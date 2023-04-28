import { ApiProperty } from "@nestjs/swagger";


export class CreateCityDto{
    @ApiProperty({example: 'Саратов', description: 'Название города', required: true})
    readonly name : string;
}