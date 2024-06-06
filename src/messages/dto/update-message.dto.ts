import { ApiProperty } from "@nestjs/swagger";

export class UpdateMessageDto{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    id: number;

    @ApiProperty({example: "hello", description: "content in message", required: true})
    content?: string;

    @ApiProperty({example: true, description: "is read message", required: true})
    isRead?: boolean;
}