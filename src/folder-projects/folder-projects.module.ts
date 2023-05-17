import { Module } from '@nestjs/common';
import { FolderProjectsService } from './folder-projects.service';
import { FolderProjectsController } from './folder-projects.controller';

@Module({
  providers: [FolderProjectsService],
  controllers: [FolderProjectsController]
})
export class FolderProjectsModule {}
