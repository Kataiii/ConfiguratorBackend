import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFolderProjectsDto } from './dto/create_folder-projects.dto';
import { FolderProjects } from './folder-projects.model';

@Injectable()
export class FolderProjectsService {
    constructor(@InjectModel(FolderProjects) private folderProjectsRepository: typeof FolderProjects){}

    async create(dto: CreateFolderProjectsDto){
        return await this.folderProjectsRepository.create(dto);
    }

    async getAll(){
        return await this.folderProjectsRepository.findAll();
    }

    async getByAccountId(id: number){
        return await this.folderProjectsRepository.findAll({where: {account_id: id}});
    }

    async createDefaultFolders(account_id: number, names_folders: string[]){
        try{
            for(let i = 0; i < names_folders.length; i++){
                await this.create({name: names_folders[i], account_id: account_id});
            }
            return account_id;
        }
        catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
