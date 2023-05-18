import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectStatusesDto } from './dto/create_project-statuses.dto';
import { ProjectStatuses } from './project-statuses.model';

@Injectable()
export class ProjectStatusesService {
    constructor(@InjectModel(ProjectStatuses) private projectStatusesRepository: typeof ProjectStatuses){}

    async create(dto: CreateProjectStatusesDto){
        return await this.projectStatusesRepository.create(dto);
    }

    async getAllStatuses(){
        return await this.projectStatusesRepository.findAll();
    }
}
