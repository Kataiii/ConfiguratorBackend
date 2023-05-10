import { Controller, Get } from '@nestjs/common';
import { ActivationLinksService } from './activation_links.service';

@Controller('activation-links')
export class ActivationLinksController {
    constructor(private actionLinksService: ActivationLinksService){}

    @Get('/activate/:link')
    activateLink(){
        //TODO функцию активации
    }
}
