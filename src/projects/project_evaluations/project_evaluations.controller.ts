import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateProjectEvaluationsDto } from './dto/create-project_evaluations.dto';
import { PrejectEvalutionsResponse } from './dto/projects_evalutions';
import { ProjectEvaluations } from './project_evaluations.model';
import { ProjectEvaluationsService } from './project_evaluations.service';

@ApiTags('Project-Evalutions')
@Controller('project-evaluations')
export class ProjectEvaluationsController {
    constructor(private projectEvaluationsService: ProjectEvaluationsService){}

    @ApiOperation({summary: 'Create project evaluation'})
    @ApiResponse({ status: 200, type: ProjectEvaluations})
    @Post()
    async create(@Body() dto: CreateProjectEvaluationsDto, @Req() request: Request){
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectEvaluationsService.create(dto, accessToken);
    }

    @ApiOperation({summary: 'Get all project evaluation'})
    @ApiResponse({ status: 200, type: [PrejectEvalutionsResponse]})
    @Get()
    async getAll(){
        return await this.projectEvaluationsService.getAll();
    }
}
