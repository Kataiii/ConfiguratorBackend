import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create_employee.dto';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService){}

    @ApiOperation({summary: 'Create employee'})
    @ApiResponse({ status: 200, type: Employee})
    @Post()
    create(@Body() dto: CreateEmployeeDto){
        return this.employeesService.create(dto);
    }

    @ApiOperation({summary: 'Get all employees'})
    @ApiResponse({ status: 200, type: [Employee]})
    @Get()
    getAll(){
        return this.employeesService.getAll();
    }

    @ApiOperation({summary: 'Get employee by id'})
    @ApiResponse({ status: 200, type: Employee})
    @Get('/:id')
    getEmployeeById(@Param('id') id: number){
        return this.employeesService.getEmployeeById(id);
    }

    @ApiOperation({summary: 'Get employees by company id'})
    @ApiResponse({ status: 200, type: [Employee]})
    @Get('company_id/:id')
    getEmployeesByCompanyId(@Param('id') id: number){
        return this.employeesService.getEmployeesByCompanyId(id);
    }
}
