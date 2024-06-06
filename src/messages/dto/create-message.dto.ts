import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto{
    @ApiProperty({example: 1, description: 'Id chat', required: true})
    chatId: number;

    @ApiProperty({example: 1, description: 'Id sender', required: true})
    senderId: number;

    @ApiProperty({example: 1, description: 'Id role sender', required: true})
    roleSenderId: number;

    @ApiProperty({example: "hello", description: "content in message", required: true})
    content: string;

    @ApiProperty({example: true, description: "is read message", required: true})
    isRead: boolean;
}