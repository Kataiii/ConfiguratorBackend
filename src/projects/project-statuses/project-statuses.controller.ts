import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectStatusesDto } from './dto/create_project-statuses.dto';
import { ProjectStatuses } from './project-statuses.model';
import { ProjectStatusesService } from './project-statuses.service';

@ApiTags('Project-Statuses')
@Controller('project-statuses')
export class ProjectStatusesController {
    constructor(private projectStatusesService: ProjectStatusesService){}

    @ApiOperation({summary: 'Create status for project'})
    @ApiResponse({ status: 200, type: ProjectStatuses})
    @Post()
    async create(@Body() dto: CreateProjectStatusesDto){
        return await this.projectStatusesService.create(dto);
    }

    @ApiOperation({summary: 'Get all statuses for project'})
    @ApiResponse({ status: 200, type: [ProjectStatuses]})
    @Get()
    async getAllStatuses(){
        return await this.projectStatusesService.getAllStatuses();
    }

    @ApiOperation({summary: "Get status by id"})
    @ApiResponse({status: 200, type: ProjectStatuses})
    @Get("/id/:id")
    async getStatusById(@Param("id") id: number){
        return await this.projectStatusesService.getStatusById(id);
    }

    @ApiOperation({summary: "Get status by name"})
    @ApiResponse({status: 200, type: ProjectStatuses})
    @Get("/name/:name")
    async getStatusByName(@Param("name") name: string){
        return await this.projectStatusesService.getStatusByName(name);
    }
}
