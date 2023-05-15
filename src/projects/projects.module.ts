import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports:[
    SequelizeModule.forFeature([Project]),
    FilesModule
  ]
})
export class ProjectsModule {}
