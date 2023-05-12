import { Controller, Get, Param, Res } from '@nestjs/common';
import { ActivationLinksService } from './activation_links.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activation-Links')
@Controller('activation-links')
export class ActivationLinksController {
    constructor(private actionLinksService: ActivationLinksService){}

    @Get('/activate/:link')
    async activateLink(@Param('link') link : string, @Res({ passthrough: true }) response: Response){
        await this.actionLinksService.activate(link);
        return response.redirect(process.env.CLIENT_URL);
    }
}
