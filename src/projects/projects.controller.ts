import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { mapSortFactor, mapSortOrder } from 'src/utils/SortMaps';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectsDto } from './dto/delete-project.dto';
import { SaveFilesDto } from './dto/save-files.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService){}

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
    async getProjectsByAccountAndRoleIdPagination(@Req() request, 
        @Param('id') role_id: number, 
        @Query('page') page: number, 
        @Query('limit') limit: number, 
        @Query('sortFactor') sortFactor: string,
        @Query('sortOrder') sortOrder: string
    ){
        console.log(mapSortFactor.get(sortFactor));
        console.log(mapSortOrder.get(sortOrder));
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.projectsService.getProgectByAccountAndRoleIdPagination(role_id, page, limit, accessToken, mapSortFactor.get(sortFactor), mapSortOrder.get(sortOrder));
    }

    @ApiOperation({summary: 'Get projects by folder id, pagination'})
    @ApiResponse({status: 200, type: Project})
    @ApiResponse({status: 404, description: 'Projects not found'})
    @Get('pagination/folder/:id')
    async getProjectsByFolderIdPagination(@Param('id') folder_id: number, 
        @Query('page') page: number, 
        @Query('limit') limit: number, 
        @Query('sortFactor') sortFactor: string,
        @Query('sortOrder') sortOrder: string
    ){
        const response = await this.projectsService.getProjectsByFolderIdPagination(folder_id, page, limit, mapSortFactor.get(sortFactor), mapSortOrder.get(sortOrder));
        return response;
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

    @ApiOperation({summary: 'Get project by id'})
    @ApiResponse({status: 200, type: Project})
    @Get(':id')
    async getById(@Param('id') id: number){
        return await this.projectsService.getProjectById(id);
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

    @ApiOperation({ summary: 'Create image test' })
    @UseInterceptors(FileFieldsInterceptor([
        { name: "thum" },
        { name: "json" }
    ]))
    @Post("/save_files")
    async saveFiles(@UploadedFiles() files, @Body() dto: SaveFilesDto) {
        return await this.projectsService.createFilesProjects(dto.idUser, dto.idProject, dto.typeRole, files.thum[0], files.json[0]);
    }

    @Get("/project_file/:id")
    async getFileJson(@Param('id') projectId: number){
        return await this.projectsService.getProjectFile(projectId);
    }
}
