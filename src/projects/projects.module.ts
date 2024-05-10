import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsProjectsModule } from 'src/accounts-projects/accounts-projects.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { FolderProjectsModule } from 'src/folder-projects/folder-projects.module';
import { LastFolderProjectsModule } from 'src/last_folder-projects/last_folder-projects.module';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports:[
    SequelizeModule.forFeature([Project]),
    AccountsProjectsModule,
    forwardRef(() => AuthModule),
    LastFolderProjectsModule,
    FolderProjectsModule,
    FilesModule
  ],
  exports:[
    ProjectsService
  ]
})
export class ProjectsModule {}
