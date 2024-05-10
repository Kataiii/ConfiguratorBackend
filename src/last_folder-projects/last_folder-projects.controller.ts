import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLastFolderProjectsDto } from './dto/create-last_folder-projects.dto';
import { LastFolderProjects } from './last_folder-projects.model';
import { LastFolderProjectsService } from './last_folder-projects.service';

@ApiTags('LastFolderProjects')
@Controller('last-folder-projects')
export class LastFolderProjectsController {
    constructor(private lastPFolderProjectService: LastFolderProjectsService){}

    @ApiOperation({summary: 'Create last folder project'})
    @ApiResponse({status: 200, type: [LastFolderProjects]})
    @Post()
    async create(@Body() dto: CreateLastFolderProjectsDto){
        return await this.lastPFolderProjectService.create(dto);
    }

    @ApiOperation({summary: 'Get value by project id'})
    @ApiResponse({ status: 200, type: [LastFolderProjects]})
    @Get()
    async getValueByProjectId(@Param('project_id') project_id : number){
        return await this.lastPFolderProjectService.getValueByProjectId(project_id);
    }
}
