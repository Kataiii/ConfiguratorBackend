import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Public } from '../guards/decorators/public.decorator';
import { RecoveryLinksService } from './recovery_links.service';
import {Response} from 'express';
import { PasswordDto } from '../dto/password.dto';

@Controller('recovery-links')
export class RecoveryLinksController {
    constructor(private recoveryLinksService: RecoveryLinksService){}

    @Post('/recovery/:link')
    @Public()
    async activateLink(@Param('link') link : string, @Body() dto: PasswordDto, @Res({ passthrough: true }) response: Response){
        return await this.recoveryLinksService.activate(link, dto.password);
        // return response.redirect(process.env.CLIENT_URL);
    }
}
