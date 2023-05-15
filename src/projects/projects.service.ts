import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepository: typeof Project,
        private filesService: FilesService){}

    async create(dto: CreateProjectDto, files: any[]){
        const previewFileName = await this.filesService.createImageFile(files[0]);
        const saveFileName = await this.filesService.createProjectFile(files[1]);
        const project = await this.projectsRepository.create({...dto, preview: previewFileName, save_file: saveFileName});
        return project;
    }
}
