import { Controller, Post, Get, Body, Param} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({ status: 200, type: User})
    @Post()
    create(@Body() dto: CreateUserDto){
        return this.userService.createUser(dto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({ status: 200, type: [User]})
    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    getUserById(@Param('id') id : number){
        return this.userService.getUserById(id);
    }
}
