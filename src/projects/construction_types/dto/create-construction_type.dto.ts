import { ApiProperty } from "@nestjs/swagger";

export class CreateConstructionTypeDto{
    @ApiProperty({example: 'Дом', description: 'Тип строения', required: true})
    name: string;

    constructor(name: string){
        this.name = name;
    }
}