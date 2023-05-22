import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFolderProjectsDto } from './dto/create_folder-projects.dto';
import { FolderProjects } from './folder-projects.model';
import * as jwt from 'jsonwebtoken';

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
            console.log(e)
            throw new HttpException("Ошибка при создании папок", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFolderByNameAndAccountId(name: string, account_id: number){
        return await this.folderProjectsRepository.findOne({where: {name: name, account_id: account_id}});
    }

    async getFolderByNameAndToken(accessToken, name: string){
        const accountData = await <jwt.JwtPayload>jwt.verify(accessToken, process.env.PRIVATE_KEY);
        console.log(accountData);
        return await this.getFolderByNameAndAccountId(name, accountData.id);
    }
}
