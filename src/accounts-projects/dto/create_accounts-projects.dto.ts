import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountsProjectsDto{
    @ApiProperty({example: 1, description: 'Id аккаунта', required: true})
    readonly account_id: number;

    @ApiProperty({example: 1, description: 'Id проекта', required: true})
    readonly project_id: number;
}