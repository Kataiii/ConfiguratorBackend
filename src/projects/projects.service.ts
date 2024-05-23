import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import * as jwt from 'jsonwebtoken';
import { AccountsProjectsService } from 'src/accounts-projects/accounts-projects.service';
import { CreateProjectNameDto } from './dto/create-project-name.dto';
import { AccountsProjects } from 'src/accounts-projects/accounts-ptojects.model';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LastFolderProjectsService } from 'src/last_folder-projects/last_folder-projects.service';
import { FolderProjectsService } from 'src/folder-projects/folder-projects.service';
import { mapSortFactor } from 'src/utils/SortMaps';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepository: typeof Project,
        private authService: AuthService,
        private accountsProjectsService: AccountsProjectsService,
        private lastFolderProjectsService: LastFolderProjectsService,
        private folderProjectService: FolderProjectsService,
        private filesService: FilesService){}

    private async checkAccountData(accessToken: string | undefined){
        return <jwt.JwtPayload>this.authService.validateAccessToken(accessToken);
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

    async createFilesProjects(idUser: string | number, idProject: string | number, typeRole: string, thum: File, json: File){
        const names: string[] = await this.filesService.createProjectFiles(idUser, idProject, typeRole, thum, json);
        const project: Project = await this.projectsRepository.findOne({where: {id: idProject}});

        if(project.preview !== null) this.filesService.deleteFile(project.preview, [typeRole, String(idUser), "projects", String(idProject)]);
        if(project.save_file !== null) this.filesService.deleteFile(project.save_file, [typeRole, String(idUser), "projects", String(idProject)]);

        return await this.projectsRepository.update({id: project.id, preview: names[0], save_file: names[1]}, {where: {id: project.id}});
    }

    async getProjectFile(idProject: string | number){
        const project = await this.projectsRepository.findOne({where: {id: idProject}});
        const accountProject = await this.accountsProjectsService.getByProjectId(idProject);
        const file: JSON = JSON.parse(
            fs.readFileSync(path.resolve(
                __dirname, 
                "..", 
                "..", 
                "static", 
                `${accountProject.role_id === 4 ? "users" : "companies"}/${accountProject.account_id}/projects/${project.id}/${project.save_file}`), "utf8")
        );
        return JSON.stringify(file);
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

    async getProgectByAccountAndRoleIdPagination(role_id: number, page: number, limit: number, accessToken: string | undefined, sortFactor: string, sortOrder: string){
        const accountData = await this.checkAccountData(accessToken);
        const account_projects: AccountsProjects[] = await this.accountsProjectsService.getProjectsByAccountAndRoleIdPagination(accountData.id, role_id, page, limit, sortFactor,sortOrder);

        if(account_projects.length == 0){
            throw new HttpException("Projects not found", HttpStatus.NOT_FOUND);
        }

        let projects: Project[] = [];
        for(let i = 0; i < account_projects.length; i++){
            const project = await this.getProjectById(account_projects[i].project_id);
            projects.push(project);
        }
        if(sortFactor === mapSortFactor.get("По дате")) return projects;
        projects = projects.sort((pr1, pr2) => {
            if(typeof pr1[sortFactor] === 'object'){
                if(pr1[sortFactor] > pr2[sortFactor])
                {
                    // console.log(new Date(pr1[sortFactor]));
                    // console.log(new Date(pr2[sortFactor]));
                    // console.log(new Date(pr1[sortFactor]) > new Date(pr2[sortFactor]));
                    return 1;
                }
                if(pr1[sortFactor] < pr2[sortFactor]) 
                {
                    return -1;
                }
                return 0;
            }
            else{
                return pr1[sortFactor].localeCompare(pr2[sortFactor]);
            }
        });
        let projectToSend: Project[] = [];
        for(let i: number = (page-1)*limit; i <(page-1)*limit + Number(limit); i++){
            if(projects[i] != null) {
                projectToSend.push(projects[i]);
            }
        }
        return projectToSend;
    }

    async getProjectsByFolderIdPagination(folder_id: number, page: number, limit: number, sortFactor: string, sortOrder: string){
        const projects = await this.projectsRepository.findAll({
            where: {
                folder_id: folder_id
            },
            order: [
                [sortFactor, sortOrder]
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
        const response = await this.projectsRepository.update(dto, {where: {id: dto.id}});
        return await this.projectsRepository.findOne({where: {id: dto.id}});
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
