import { Module } from '@nestjs/common';
import { ProjectEvaluationsService } from './project_evaluations.service';
import { ProjectEvaluationsController } from './project_evaluations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectEvaluations } from './project_evaluations.model';
import { ProjectsModule } from '../projects.module';
import { FilesModule } from 'src/files/files.module';
import { FolderProjectsModule } from 'src/folder-projects/folder-projects.module';

@Module({
  providers: [ProjectEvaluationsService],
  controllers: [ProjectEvaluationsController],
  imports: [
    SequelizeModule.forFeature([ProjectEvaluations]),
    ProjectsModule,
    FilesModule,
    FolderProjectsModule
  ]
})
export class ProjectEvaluationsModule {}
