import { Controller, Post, Get, Body, Param, UseInterceptors, UploadedFiles, Patch, UploadedFile } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import { Company } from './companies.model';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create_company.dto';
import { UpdateAvatarInfo } from './dto/update_company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService){}

    @ApiOperation({summary: 'Create company'})
    @ApiResponse({ status: 200, type: Company})
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    create(dto: CreateCompanyDto, @UploadedFiles() files){
        return this.companiesService.create(dto, files);
    }

    @ApiOperation({summary: 'Get all companies'})
    @ApiResponse({ status: 200, type: [Company]})
    @Get()
    getAll(){
        return this.companiesService.getAll();
    }

    @ApiOperation({summary: 'Get company by id'})
    @ApiResponse({ status: 200, type: Company})
    @Get('/:id')
    getCompanyById(@Param('id') id : number){
        return this.companiesService.getCompanyById(id);
    }

    @ApiOperation({summary: 'Upload avatar'})
    @ApiResponse({status: 200, type: STRING})
    @Patch('/upload_avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(@Body() userInfo: UpdateAvatarInfo, @UploadedFile() file: File){
        return await this.companiesService.uploadAvatar(file, userInfo);
    }

    // @ApiOperation({summary: 'Update company'})
    // @ApiResponse({status: 200, type: Company})
    // @Patch()
    // async updateUser(@Body() dto: UpdateUserDto){
    //     return await this.userService.updateUser(dto);
    // }
}
