import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectsDto } from './dto/delete-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService){}

    @ApiOperation({summary: 'Create project'})
    @ApiResponse({ status: 201, type: Project})
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() dto: CreateProjectDto,
        @UploadedFiles() files, @Req() request: Request){
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            const accessToken = type === 'Bearer' ? token : undefined;
            return await this.projectsService.create(dto, files, accessToken);
    }

    @ApiOperation({summary: 'Create project without files'})
    @ApiResponse({status: 201, type: Project})
    @Post('/project')
    async createWithoutFiles(@Body() dto: CreateProjectDto, @Req() request: Request){
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectsService.createWithoutFiles(dto, undefined, undefined, accessToken);
    }

    @ApiOperation({summary: 'Get all projects in folder'})
    @ApiResponse({ status: 200, type: [Project]})
    @Get('/folder/:id')
    async getProjectsByFolderId(@Param('id') id : number){
        return await this.projectsService.getProjectsByFolderId(id);
    }

    @ApiOperation({summary: 'Get projects by account id and role id, pagination'})
    @ApiResponse({status: 200, type: Project})
    @ApiResponse({status: 404, description: 'Projects not found'})
    @Get('/pagination/:id')
    async getProjectsByAccountAndRoleIdPagination(@Req() request, @Param('id') role_id: number, @Query('page') page: number, @Query('limit') limit: number){
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectsService.getProgectByAccountAndRoleIdPagination(role_id, page, limit, accessToken);
    }

    @ApiOperation({summary: 'Get projects by folder id, pagination'})
    @ApiResponse({status: 200, type: Project})
    @ApiResponse({status: 404, description: 'Projects not found'})
    @Get('pagination/folder/:id')
    async getProjectsByFolderIdPagination(@Param('id') folder_id: number, @Query('page') page: number, @Query('limit') limit: number){
        return await this.projectsService.getProjectsByFolderIdPagination(folder_id, page, limit);
    }

    @ApiOperation({summary: 'Update project'})
    @ApiResponse({status: 200, type: Project})
    @Patch()
    async update(@Body() dto: UpdateProjectDto){
        return await this.projectsService.update(dto);
    }

    @ApiOperation({summary: 'Delete project'})
    @ApiResponse({status: 200})
    @Delete()
    async delete(@Body() dto: DeleteProjectsDto){
        return await this.projectsService.delete(dto.id);
    }

    @ApiOperation({summary: 'Count all projects by role id and account id'})
    @ApiResponse({status: 200, type: Number})
    @Get('count/:id')
    async countAllProjects(@Param('id') role_id: number, @Req() request: Request){
        const [type, token] = request.headers.authorization.split(' ');
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectsService.countAllProjects(accessToken, role_id);
    }

    @ApiOperation({summary: 'Count all projects in folder'})
    @ApiResponse({status: 200, type: Number})
    @Get('/count/folder/:id')
    async countAllProjectsInFolder(@Param('id') folder_id: number){
        return await this.projectsService.countAllProjectsInFolder(folder_id);
    }

    @ApiOperation({summary: 'Add project in basket'})
    @ApiResponse({status: 200, type: Project})
    @Post('/add_in_basket')
    async addProjectInBasket(@Body() project: Project, @Req() request: Request){
        const [type, token] = request.headers.authorization.split(' ');
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectsService.addProjectInBasket(project, accessToken);
    }
}
