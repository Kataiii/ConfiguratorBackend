import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
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
        @UploadedFiles() files, @Req() request: Request){
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            const accessToken = type === 'Bearer' ? token : undefined;
            return await this.projectsService.create(dto, files, accessToken);
    }

    @ApiOperation({summary: 'Get all projects in folder'})
    @ApiResponse({ status: 200, type: [Project]})
    @Get('/folder/:id')
    async getProjectsByFolderId(@Param('id') id : number){
        return await this.projectsService.getProjectsByFolderId(id);
    }
}
