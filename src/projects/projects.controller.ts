import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService){}

    @ApiOperation({summary: 'Create project'})
    @ApiResponse({ status: 200, type: Project})
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() dto: CreateProjectDto,
        @UploadedFiles() files){
            return await this.projectsService.create(dto, files);
    }

    @ApiOperation({summary: 'Get all projects in folder'})
    @ApiResponse({ status: 200, type: [Project]})
    @Get('/folder/:id')
    async getProjectsByFolderId(@Param('id') id : number){
        return await this.projectsService.getProjectsByFolderId(id);
    }
}
