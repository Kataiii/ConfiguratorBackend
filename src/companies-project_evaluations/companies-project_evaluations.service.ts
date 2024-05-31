import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompaniesProjectEvaluations } from './companies-project_evaluations.model';
import { CreateCompaniesProjectEvalDto } from './dto/create-companies-project-eval.dto';
import { UpdateCompaniesProjectEvalDto } from './dto/update-companies-project_evaluations.dto';

@Injectable()
export class CompaniesProjectEvaluationsService {
    constructor(@InjectModel(CompaniesProjectEvaluations) 
        private companiesProjectEvalRepository: typeof CompaniesProjectEvaluations){}

    async create(dto: CreateCompaniesProjectEvalDto){
        return await this.companiesProjectEvalRepository.create(dto);
    }

    async getAllByCompanyId(company_id: number){
        return await this.companiesProjectEvalRepository.findAll({where: {company_id: company_id}})
    }

    async getByCompanyIdProjectId(company_id: number, project_evaluation_id: number){
        return await this.companiesProjectEvalRepository.findOne(
            {where: {company_id: company_id, project_evaluation_id: project_evaluation_id}});
    }

    async update(dto: UpdateCompaniesProjectEvalDto){
        const response = await this.companiesProjectEvalRepository.update(dto, {where: {company_id: dto.company_id, project_evaluation_id: dto.project_evaluation_id}});
        return await this.companiesProjectEvalRepository.findOne({where: {company_id: dto.company_id, project_evaluation_id: dto.project_evaluation_id}}); 
    }
}
