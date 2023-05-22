import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { FolderProjectsService } from 'src/folder-projects/folder-projects.service';
import { ProjectsService } from '../projects.service';
import { CreateProjectEvaluationsDto } from './dto/create-project_evaluations.dto';
import { ProjectEvaluations } from './project_evaluations.model';

@Injectable()
export class ProjectEvaluationsService {
    constructor(@InjectModel(ProjectEvaluations) private projectEvalutionsRepository: typeof ProjectEvaluations,
        private projectsService: ProjectsService,
        private filesService: FilesService,
        private foldersProjectsService: FolderProjectsService){}

    async create(dto: CreateProjectEvaluationsDto, token){
        const project = await this.projectsService.getProjectById(dto.project_id);
        const nameFileProject = await this.filesService.cloneFile(project.save_file, 'projects');
        const namePreviow = await this.filesService.cloneFile(project.preview, 'picture');
        const folder = await this.foldersProjectsService.getFolderByNameAndToken(token, "Отправленные");
        const cloneProject = await this.projectsService.createProjectBd({
                name: project.name,
                construction_type_id: project.construction_type_id,
                floor_number: project.floor_number,
                folder_id: folder.id,
                save_file: nameFileProject,
                preview: namePreviow
            });
        return await this.projectEvalutionsRepository.create({...dto, project_id: cloneProject.id});
    }
}
