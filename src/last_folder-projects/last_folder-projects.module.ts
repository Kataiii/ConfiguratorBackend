import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LastFolderProjectsController } from './last_folder-projects.controller';
import { LastFolderProjects } from './last_folder-projects.model';
import { LastFolderProjectsService } from './last_folder-projects.service';

@Module({
  controllers: [LastFolderProjectsController],
  providers: [LastFolderProjectsService],
  imports:[
    SequelizeModule.forFeature([LastFolderProjects]),
  ],
  exports:[
    LastFolderProjectsService
  ]
})
export class LastFolderProjectsModule {}
