import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto{
    @ApiProperty({example: 'admin', description: 'Название роли', required: true})
    readonly value: string;

    @ApiProperty({example: '1', description: 'Id аккаунта, которому назначить роль', required: true})
    readonly account_id: number;
}