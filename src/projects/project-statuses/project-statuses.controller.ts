import { Body, Controller, Get, Post } from '@nestjs/common';
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

    @ApiOperation({summary: 'Create all statuses for project'})
    @ApiResponse({ status: 200, type: [ProjectStatuses]})
    @Get()
    async getAllStatuses(){
        return await this.projectStatusesService.getAllStatuses();
    }
}
