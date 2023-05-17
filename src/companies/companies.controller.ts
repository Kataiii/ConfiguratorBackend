import { Controller, Post, Get, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FilesInterceptor('files'))
    create(dto: CreateCompanyDto, @UploadedFiles() files){
        return this.companiesService.create(dto, files);
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
