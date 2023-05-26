import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompaniesProjectEvaluationsService } from './companies-project_evaluations.service';
import { CreateCompaniesProjectEvalDto } from './dto/create-companies-project-eval.dto';

@ApiTags('Companies-Project_evaluations')
@Controller('companies-project-evaluations')
export class CompaniesProjectEvaluationsController {
    constructor(private companiesProjectEvalService: CompaniesProjectEvaluationsService){}

    @Post()
    create(@Body() dto: CreateCompaniesProjectEvalDto){
        return this.companiesProjectEvalService.create(dto);
    }

    @Get('/:id')
    getProjectEvalsByCompanyId(@Param() company_id: number){
        return this.companiesProjectEvalService.getAllByCompanyId(company_id);
    }

    getByProjectEvalIdCompanyId(@Param('company_id') company_id: number, 
        @Param('project_evaluations_id') project_evaluations_id: number){
            return this.companiesProjectEvalService.getByCompanyIdProjectId(company_id, project_evaluations_id);
    }
}
