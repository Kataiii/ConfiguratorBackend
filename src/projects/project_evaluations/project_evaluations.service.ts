import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { FolderProjectsService } from 'src/folder-projects/folder-projects.service';
import { Project } from '../projects.model';
import { ProjectsService } from '../projects.service';
import { CreateProjectEvaluationsDto } from './dto/create-project_evaluations.dto';
import { PrejectEvalutionsResponse } from './dto/projects_evalutions';
import { ProjectEvaluations } from './project_evaluations.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ProjectEvaluationsService {
    constructor(@InjectModel(ProjectEvaluations) private projectEvalutionsRepository: typeof ProjectEvaluations,
        private projectsService: ProjectsService,
        private filesService: FilesService,
        private foldersProjectsService: FolderProjectsService) { }

    async create(dto: CreateProjectEvaluationsDto, accessToken) {
        const accountData = await <jwt.JwtPayload>jwt.verify(accessToken, process.env.PRIVATE_KEY);
        const project = await this.projectsService.getProjectById(dto.project_id);
        const folder = await this.foldersProjectsService.getFolderByNameAndToken(accessToken, "Отправленные");

        const cloneProject = await this.projectsService.createProjectBd({
            name: project.name,
            construction_type_id: project.construction_type_id,
            floor_number: project.floor_number,
            folder_id: folder.id
        });

        console.log(cloneProject.id);

        const nameFileProject = await this.filesService.cloneFile(
            project.save_file,
            `${accountData.roles.find(r => r.id === 4) ? "users" : "companies"}/${accountData.id}/projects/${project.id}`,
            `${accountData.roles.find(r => r.id === 4) ? "users" : "companies"}/${accountData.id}/projects/${cloneProject.id}`
        );
        const namePreviow = await this.filesService.cloneFile(
            project.preview ,
            `${accountData.roles.find(r => r.id === 4) ? "users" : "companies"}/${accountData.id}/projects/${project.id}`,
            `${accountData.roles.find(r => r.id === 4) ? "users" : "companies"}/${accountData.id}/projects/${cloneProject.id}`
        );

        await this.projectsService.update({id: cloneProject.id, preview: namePreviow, save_file: nameFileProject});
        // const folder = await this.foldersProjectsService.getFolderByNameAndToken(accessToken, "Отправленные");
        // const cloneFiles = await this.projectsService.createFilesProjects(
        //     accountData.id, 
        //     project.id,
        //     accountData.roles.find(r => r.id === 4) ? "users" : "companies",)
        // const cloneProject = await this.projectsService.createProjectBd({
        //     name: project.name,
        //     construction_type_id: project.construction_type_id,
        //     floor_number: project.floor_number,
        //     folder_id: folder.id,
        //     save_file: nameFileProject,
        //     preview: namePreviow
        // });
        return await this.projectEvalutionsRepository.create({ ...dto, project_id: cloneProject.id });
    }

    async getAll(): Promise<PrejectEvalutionsResponse[]> {
        return await this.projectEvalutionsRepository.findAll({ include: Project });
    }
}
