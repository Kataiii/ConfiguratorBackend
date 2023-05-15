import { ApiProperty } from "@nestjs/swagger";

export class BanAccountDto{
    @ApiProperty({example: '1', description: 'Id аккаунта, которому назначить роль', required: true})
    readonly account_id: number;

    @ApiProperty({example: 'Спам', description: 'Причина блокировки', required: true})
    readonly banReason: string;
}