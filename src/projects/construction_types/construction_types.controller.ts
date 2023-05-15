import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConstructionType } from './construction_types.model';
import { ConstructionTypesService } from './construction_types.service';
import { CreateConstructionTypeDto } from './dto/create-construction_type.dto';

@ApiTags('Construction-Types')
@Controller('construction-types')
export class ConstructionTypesController {
    constructor(private constructionTypesService: ConstructionTypesService){}

    @ApiOperation({summary: 'Create construction type'})
    @ApiResponse({ status: 200, type: ConstructionType})
    @Post()
    create(@Body() dto : CreateConstructionTypeDto){
        return this.constructionTypesService.create(dto);
    }

    @ApiOperation({summary: 'Get all construction types'})
    @ApiResponse({status: 200, type: [ConstructionType]})
    @Get()
    getAll(){
        return this.constructionTypesService.getAll();
    }

    @ApiOperation({summary: 'Get construction type by name'})
    @ApiResponse({status: 200, type: ConstructionType})
    @Get('/:name')
    getByName(@Param('name') name : string){
        return this.constructionTypesService.getByName(name);
    }
}
