import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyType } from './company_types.model';
import { CompanyTypesService } from './company_types.service';
import { CreateCompanyTypesDto } from './dto/create_company_type.dto';

@ApiTags('Company Types')
@Controller('company-types')
export class CompanyTypesController {
    constructor(private companyTypesService : CompanyTypesService){}

    @ApiOperation({summary: 'Create company type'})
    @ApiResponse({ status: 200, type: CompanyType})
    @Post()
    create(@Body() dto: CreateCompanyTypesDto){
        return this.companyTypesService.create(dto);
    }

    @ApiOperation({summary: 'Get all company types'})
    @ApiResponse({ status: 200, type: [CompanyType]})
    @Get()
    getAll(){
        return this.companyTypesService.getAll();
    }
}
