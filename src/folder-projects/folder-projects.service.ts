import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFolderProjectsDto } from './dto/create_folder-projects.dto';
import { FolderProjects } from './folder-projects.model';

@Injectable()
export class FolderProjectsService {
    // constructor(@InjectModel(FolderProjects) private folderProjectsRepository: typeof FolderProjects){}

    // async create(dto: CreateFolderProjectsDto){
    //     return await this.folderProjectsRepository.create(dto);
    // }

    // async getAll(){
    //     return await this.folderProjectsRepository.findAll();
    // }

    // async getByAccountId(id: number){
    //     return await this.folderProjectsRepository.findAll({where: {account_id: id}});
    // }
}
