import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFolderProjectsDto } from './dto/create_folder-projects.dto';
import { FolderProjects } from './folder-projects.model';
import { FolderProjectsService } from './folder-projects.service';

@Controller('folder-projects')
export class FolderProjectsController {
    constructor(private folderProjectsService: FolderProjectsService){}

    @ApiOperation({summary: 'Create folder for projects'})
    @ApiResponse({ status: 200, type: FolderProjects})
    @Post()
    async create(dto: CreateFolderProjectsDto){
        return await this.folderProjectsService.create(dto);
    }

    @ApiOperation({summary: 'Get folders by account id'})
    @ApiResponse({ status: 200, type: [FolderProjects]})
    @Get('/:id')
    async getFoldersByAccountId(@Param('id') id : number){
        return await this.folderProjectsService.getByAccountId(id);
    }
}
