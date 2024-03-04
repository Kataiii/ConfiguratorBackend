import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NUMBER } from 'sequelize';
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
    async create(@Body() dto : CreateCityDto){
        return await this.citiesService.create(dto);
    }

    @ApiOperation({summary: 'Get all cities'})
    @ApiResponse({status: 200, type: [City]})
    @Get()
    async getAll(){
        return await this.citiesService.getAllCities();
    }

    @ApiOperation({summary: 'Get all cities with pagination'})
    @ApiResponse({status: 200, type: [City]})
    @Get('/pagination')
    async getAllWithPagination(@Query('page') page: number, @Query('limit') limit: number, ){
        return await this.citiesService.getAllCitiesWithPagination(page, limit);
    }

    @ApiOperation({summary: 'Get count for all cities'})
    @ApiResponse({status: 200, type: NUMBER})
    @Get('/count')
    async countAllCities(){
        return await this.citiesService.countAllCities();
    }

    @ApiOperation({summary: 'Get city by id'})
    @ApiResponse({status: 200, type: City})
    @Get('/:id')
    async getById(@Param('id') id : number){
        return await this.citiesService.getById(id);
    }
}
