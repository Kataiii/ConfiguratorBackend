import { Controller, Post, Get, Body, Param, UseGuards, Patch, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAvatarInfo, UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({ status: 200, type: User})
    @Post()
    async create(@Body() dto: CreateUserDto){
        return await this.userService.createUser(dto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({ status: 200, type: [User]})
    @Get()
    @Roles('admin')
    @UseGuards(RolesAuthGuard)
    async getAll(){
        return await this.userService.getAll();
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    async getUserById(@Param('id') id : number){
        return await this.userService.getUserById(id);
    }

    @ApiOperation({summary: 'Upload avatar'})
    @ApiResponse({status: 200, type: STRING})
    @Patch('/upload_avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(@Body() userInfo: UpdateAvatarInfo, @UploadedFile() file: File){
        return await this.userService.uploadAvatar(file, userInfo);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: User})
    @Patch()
    async updateUser(@Body() dto: UpdateUserDto){
        return await this.userService.updateUser(dto);
    }
}
