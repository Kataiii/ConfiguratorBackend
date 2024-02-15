import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLastFolderProjectsDto } from './dto/create-last_folder-projects.dto';
import { LastFolderProjects } from './last_folder-projects.model';

@Injectable()
export class LastFolderProjectsService {
    constructor(@InjectModel(LastFolderProjects) private lastFolderProjectsRepository: typeof LastFolderProjects){}

    async create(dto: CreateLastFolderProjectsDto){
        return await this.lastFolderProjectsRepository.create(dto);
    }

    async getValueByProjectId(project_id){
        return await this.lastFolderProjectsRepository.findOne({
            where: {
                project_id: project_id
            }
        });
    }
}
