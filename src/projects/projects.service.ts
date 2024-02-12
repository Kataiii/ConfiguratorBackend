import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import * as jwt from 'jsonwebtoken'
import { AccountsProjectsService } from 'src/accounts-projects/accounts-projects.service';
import { CreateProjectNameDto } from './dto/create-project-name.dto';
import { AccountsProjects } from 'src/accounts-projects/accounts-ptojects.model';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepository: typeof Project,
        private filesService: FilesService,
        private authService: AuthService,
        private accountsProjectsService: AccountsProjectsService){}

    private checkAccountData(accessToken: string | undefined){
        return <jwt.JwtPayload>this.authService.validateAccessToken(accessToken);
    }
    
    async create(dto: CreateProjectDto, files: any[], accessToken: string | undefined){
        const previewFileName = await this.filesService.createImageFile(files[0]);
        const saveFileName = await this.filesService.createProjectFile(files[1]);
        const project = await this.createProjectBd({...dto, preview: previewFileName, save_file: saveFileName});
        const accountData = this.checkAccountData(accessToken);
        await this.accountsProjectsService.create({account_id: accountData.id, project_id: project.id, role_id: dto.role_id})
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

    //TODO проверить работоспособность
    async getProgectByAccountAndRoleIdPagination(role_id: number, page: number, limit: number, accessToken: string | undefined){
        const accountData = this.checkAccountData(accessToken);
        const account_projects: AccountsProjects[] = await this.accountsProjectsService.getProjectsByAccountAndRoleIdPagination(accountData.id, role_id, page, limit);

        if(account_projects.length == 0){
            throw new HttpException("Projects not found", HttpStatus.NOT_FOUND);
        }

        let projects = [];
        for(let i = 0; i < account_projects.length; i++){
            const project = await this.getProjectById(account_projects[i].project_id);
            projects.push(project);
        }
        return projects;
    }

    //TODO проверить работоспособность
    async getProjectsByFolderIdPagination(folder_id: number, page: number, limit: number){
        const projects = await this.projectsRepository.findAll({
            where: {
                folder_id: folder_id
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: limit,
            offset: (page - 1)*limit
        });

        if(projects.length == 0){
            throw new HttpException("Projects not found", HttpStatus.NOT_FOUND);
        }
        return projects;
    }

    async update(dto: UpdateProjectDto){
        return await this.projectsRepository.update(dto, {where: {id: dto.id}});
    }

    async delete(id: number){
        return await this.projectsRepository.destroy({where: {id: id}});
    }
}
