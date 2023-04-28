import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Company } from './companies.model';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create_company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService){}

    @ApiOperation({summary: 'Create company'})
    @ApiResponse({ status: 200, type: Company})
    @Post()
    create(dto: CreateCompanyDto){
        return this.companiesService.create(dto);
    }

    @ApiOperation({summary: 'Get all companies'})
    @ApiResponse({ status: 200, type: [Company]})
    @Get()
    getAll(){
        return this.companiesService.getAll();
    }

    @ApiOperation({summary: 'Get company by id'})
    @ApiResponse({ status: 200, type: Company})
    @Get('/:id')
    getCompanyById(@Param('id') id : number){
        return this.companiesService.getCompanyById(id);
    }
}
