import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto);
    }

    @Get('/:id')
    getById(@Param('id') id : number){
        return this.roleService.getRoleById(id);
    }

    @Get('name/:name')
    getByName(@Param('name') name : string){
        return this.roleService.getRoleByName(name);
    }
}
