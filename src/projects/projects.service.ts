import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import * as jwt from 'jsonwebtoken'
import { AccountsProjectsService } from 'src/accounts-projects/accounts-projects.service';
import { CreateProjectNameDto } from './dto/create-project-name.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepository: typeof Project,
        private filesService: FilesService,
        private authService: AuthService,
        private accountsProjectsService: AccountsProjectsService){}

    async create(dto: CreateProjectDto, files: any[], accessToken: string | undefined){
        const previewFileName = await this.filesService.createImageFile(files[0]);
        const saveFileName = await this.filesService.createProjectFile(files[1]);
        const project = await this.createProjectBd({...dto, preview: previewFileName, save_file: saveFileName});
        const accountData = await <jwt.JwtPayload>this.authService.validateAccessToken(accessToken);
        await this.accountsProjectsService.create({account_id: accountData.id, project_id: project.id})
        return project;
    }

    async createProjectBd(dto: CreateProjectNameDto){
        return await this.projectsRepository.create(dto);
    }

    async getAll(){
        return await this.projectsRepository.findAll();
    }

    async getProjectsByFolderId(folder_id: number){
        return await this.projectsRepository.findAll({where: {folder_id: folder_id}});
    }

    async getProjectById(id: number){
        return await this.projectsRepository.findOne({where: {id: id}});
    }
}
