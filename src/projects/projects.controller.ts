import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
}
