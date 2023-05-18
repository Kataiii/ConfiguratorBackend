import { Module } from '@nestjs/common';
import { FolderProjectsService } from './folder-projects.service';
import { FolderProjectsController } from './folder-projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FolderProjects } from './folder-projects.model';

@Module({
  providers: [FolderProjectsService],
  controllers: [FolderProjectsController],
  imports: [
    SequelizeModule.forFeature([FolderProjects]),
  ],
  exports: [
    FolderProjectsService
  ]
})
export class FolderProjectsModule {}
