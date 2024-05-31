import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesProjectEvaluations } from './companies-project_evaluations.model';
import { CompaniesProjectEvaluationsService } from './companies-project_evaluations.service';
import { CreateCompaniesProjectEvalDto } from './dto/create-companies-project-eval.dto';
import { UpdateCompaniesProjectEvalDto } from './dto/update-companies-project_evaluations.dto';

@ApiTags('Companies-Project_evaluations')
@Controller('companies-project-evaluations')
export class CompaniesProjectEvaluationsController {
    constructor(private companiesProjectEvalService: CompaniesProjectEvaluationsService){}

    @ApiOperation({summary: 'Create companies project_evaluations for project'})
    @ApiResponse({ status: 200, type: CompaniesProjectEvaluations})
    @Post()
    async create(@Body() dto: CreateCompaniesProjectEvalDto){
        return await this.companiesProjectEvalService.create(dto);
    }

    @ApiOperation({summary: 'Get all items by company id'})
    @ApiResponse({ status: 200, type: [CompaniesProjectEvaluations]})
    @Get('/:id')
    async getProjectEvalsByCompanyId(@Param() company_id: number){
        return await this.companiesProjectEvalService.getAllByCompanyId(company_id);
    }

    @ApiOperation({summary: 'Get item by company id and project id'})
    @ApiResponse({ status: 200, type: CompaniesProjectEvaluations})
    @Get("/:company_id/:project_evaluations_id")
    async getByProjectEvalIdCompanyId(@Param('company_id') company_id: number, 
        @Param('project_evaluations_id') project_evaluations_id: number){
            return await this.companiesProjectEvalService.getByCompanyIdProjectId(company_id, project_evaluations_id);
    }

    @ApiOperation({summary: "Update status item"})
    @ApiResponse({status: 200, type: CompaniesProjectEvaluations})
    @Patch()
    async update(@Body() dto: UpdateCompaniesProjectEvalDto){
        return await this.companiesProjectEvalService.update(dto);
    }
}
