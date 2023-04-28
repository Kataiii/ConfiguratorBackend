import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyType } from './company_types.model';
import { CreateCompanyTypesDto } from './dto/create_company_type.dto';

@Injectable()
export class CompanyTypesService {
    constructor(@InjectModel(CompanyType) private companyTypeRepository: typeof CompanyType){}

    async create(dto : CreateCompanyTypesDto){
        const companyType = await this.companyTypeRepository.create(dto);
        return companyType;
    }

    async getAll(){
        const companyTypes = await this.companyTypeRepository.findAll();
        return companyTypes;
    }
}
