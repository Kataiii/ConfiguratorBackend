import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create_company.dto';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company) private companyRepository: typeof Company){}

    async create(dto : CreateCompanyDto){
        const company = await this.companyRepository.create(dto);
        return company;
    }

    async getAll(){
        const companies = await this.companyRepository.findAll();
        return companies;
    }

    async getCompanyById(id: number){
        const company = await this.companyRepository.findOne({where: {id}, include: {all: true}});
        return company;
    }
}
