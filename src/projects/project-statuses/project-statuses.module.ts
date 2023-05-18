import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectStatusesController } from './project-statuses.controller';
import { ProjectStatuses } from './project-statuses.model';
import { ProjectStatusesService } from './project-statuses.service';

@Module({
  controllers: [ProjectStatusesController],
  providers: [ProjectStatusesService],
  imports: [
    SequelizeModule.forFeature([ProjectStatuses]),
  ]
})
export class ProjectStatusesModule {}
