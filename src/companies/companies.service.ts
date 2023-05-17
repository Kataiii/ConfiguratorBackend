import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create_company.dto';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company) private companyRepository: typeof Company,
    private filesService: FilesService){}

    async create(dto : CreateCompanyDto, files: any[]){
        const links: string[] = await this.filesService.createCompanyFiles(files, dto.company_name);
        const company = await this.companyRepository.create({...dto, official_letter: links[0], inn_file: links[1]});
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
