import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto{
    @ApiProperty({example: 1, description: 'Id user', required: true})
    userId: number;

    @ApiProperty({example: 1, description: 'Id company', required: true})
    companyId: number;
}