import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
    constructor(private citiesService : CitiesService){}

    @Post()
    create(@Body() dto : CreateCityDto){
        return this.citiesService.create(dto);
    }

    @Get()
    getAll(){
        return this.citiesService.getAllCities();
    }
}
