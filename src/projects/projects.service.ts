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
import { LastFolderProjectsService } from 'src/last_folder-projects/last_folder-projects.service';
import { FolderProjectsService } from 'src/folder-projects/folder-projects.service';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepository: typeof Project,
        private filesService: FilesService,
        private authService: AuthService,
        private accountsProjectsService: AccountsProjectsService,
        private lastFolderProjectsService: LastFolderProjectsService,
        private folderProjectService: FolderProjectsService){}

    private async checkAccountData(accessToken: string | undefined){
        return <jwt.JwtPayload>this.authService.validateAccessToken(accessToken);
    }
    
    async create(dto: CreateProjectDto, files: any[], accessToken: string | undefined){
        const previewFileName = await this.filesService.createImageFile(files[0]);
        const saveFileName = await this.filesService.createProjectFile(files[1]);
        return await this.createWithoutFiles(dto, previewFileName, saveFileName, accessToken);
    }

    async createWithoutFiles(dto: CreateProjectDto, previewFileName: string | undefined, saveFileName: string | undefined, accessToken: string | undefined){
        const project = await this.createProjectBd({...dto, preview: previewFileName, save_file: saveFileName});
        const accountData = await this.checkAccountData(accessToken);
        const dto_account_project = {account_id: accountData.id, project_id: project.id, role_id: dto.role_id};
        await this.accountsProjectsService.create(dto_account_project);
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

    async getProgectByAccountAndRoleIdPagination(role_id: number, page: number, limit: number, accessToken: string | undefined){
        const accountData = await this.checkAccountData(accessToken);
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
        console.log('++++++++++++++++++++++++++++++');
        console.log(page);
        console.log('offset ',(page - 1)*limit);
        console.log(projects);
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

    async countAllProjects(accessToken: string | undefined, role_id: number): Promise<number>{
        const accountData = await this.checkAccountData(accessToken); 
        return await this.accountsProjectsService.countAllProjectByAccountAndRole(accountData.id, role_id);
    }

    async countAllProjectsInFolder(folder_id: number): Promise<number>{
        return (await this.projectsRepository.findAndCountAll({
            where: {
                folder_id: folder_id
            }
        })).count;
    }

    async addProjectInBasket(project: Project, accessToken: string | undefined){
        const accountData = await this.checkAccountData(accessToken);
        await this.lastFolderProjectsService.create({project_id: project.id, last_folder_id: project.folder_id});
        const backet = await this.folderProjectService.getFolderByNameAndAccountId("Корзина", accountData.id);
        project.folder_id = backet.id;
        return await this.update(project);
    }
}
