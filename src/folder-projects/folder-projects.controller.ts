import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFolderProjectsDto } from './dto/create_folder-projects.dto';
import { FolderProjects } from './folder-projects.model';
import { FolderProjectsService } from './folder-projects.service';
import { Request } from 'express';
import { UpdateFolderProjectsDto } from './dto/update_folder-projects.dto';
import { DeletFolderProjectsDto } from './dto/delete_folder-project.dto';

@ApiTags('Folder-Projects')
@Controller('folder-projects')
export class FolderProjectsController {
    constructor(private folderProjectsService: FolderProjectsService){}

    @ApiOperation({summary: 'Create folder for folder'})
    @ApiResponse({ status: 200, type: FolderProjects})
    @Post()
    async create(@Body() dto: CreateFolderProjectsDto){
        return await this.folderProjectsService.create(dto);
    }

    @ApiOperation({summary: 'Update name for folder'})
    @ApiResponse({ status: 200, type: FolderProjects})
    @Patch()
    async update(@Body() dto: UpdateFolderProjectsDto){
        console.log(dto);
        return await this.folderProjectsService.update(dto);
    }

    @ApiOperation({summary: 'Delete folder by id'})
    @ApiResponse({status: 200})
    @Delete()
    async delete(@Body() dto: DeletFolderProjectsDto){
        console.log(dto);
        return await this.folderProjectsService.delete(dto.id);
    }

    @ApiOperation({summary: 'Get folders by account id'})
    @ApiResponse({ status: 200, type: [FolderProjects]})
    @Get('account/:id')
    async getFoldersByAccountId(@Param('id') id : number){
        return await this.folderProjectsService.getByAccountId(id);
    }

    @ApiOperation({summary: 'Get folders by account id and role id'})
    @ApiResponse({ status: 200, type: [FolderProjects]})
    @ApiResponse({status: 404, description: 'Папки не найдены'})
    @Get('role/:role')
    async getFoldersByAccountRoleId(@Param('role') role: number, @Req() request: Request){
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const accessToken = type === 'Bearer' ? token : undefined;
        return await this.folderProjectsService.getFoldersByAccountRole(accessToken, role);
    }

    @ApiOperation({summary: 'Get folder by id'})
    @ApiResponse({status: 200, type: FolderProjects})
    @ApiResponse({status: 404, description: 'Folder not found'})
    @Get('/:id')
    async getFolderById(@Param('id') id:number){
        return await this.folderProjectsService.getFolderById(id);
    }
}
