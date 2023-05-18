import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectStatusesDto{
    @ApiProperty({example: 'На просчете', description: 'Название статуса', required: true})
    readonly name: string;
}