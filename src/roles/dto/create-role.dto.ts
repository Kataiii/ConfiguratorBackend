import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example: 'user', description: 'Название роли', required: true})
    readonly name: string;
}