import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create_employee.dto';
import { Employee } from './employees.model';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee) private employeesRepository: typeof Employee){}

    async create(dto: CreateEmployeeDto){
        return await this.employeesRepository.create(dto);
    }

    async getAll(){
        const employees = await this.employeesRepository.findAll();
        return employees;
    }

    async getEmployeeById(id: number){
        const employee = await this.employeesRepository.findOne({where: {id}});
        return employee;
    }

    async getEmployeesByCompanyId(company_id: number){
        const employee = await this.employeesRepository.findAll({where: {company_id}});
        return employee;
    }
}
