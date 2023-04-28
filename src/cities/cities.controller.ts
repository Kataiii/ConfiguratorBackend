import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from './cities.model';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
    constructor(private citiesService : CitiesService){}

    @ApiOperation({summary: 'Create city'})
    @ApiResponse({ status: 200, type: City})
    @Post()
    create(@Body() dto : CreateCityDto){
        return this.citiesService.create(dto);
    }

    @ApiOperation({summary: 'Get all cities'})
    @ApiResponse({status: 200, type: [City]})
    @Get()
    getAll(){
        return this.citiesService.getAllCities();
    }
}
