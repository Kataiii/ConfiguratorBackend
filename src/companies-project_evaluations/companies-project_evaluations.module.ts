import { Module } from '@nestjs/common';
import { CompaniesProjectEvaluationsService } from './companies-project_evaluations.service';
import { CompaniesProjectEvaluationsController } from './companies-project_evaluations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompaniesProjectEvaluations } from './companies-project_evaluations.model';

@Module({
  providers: [CompaniesProjectEvaluationsService],
  controllers: [CompaniesProjectEvaluationsController],
  imports: [
    SequelizeModule.forFeature([CompaniesProjectEvaluations])
  ]
})
export class CompaniesProjectEvaluationsModule {}
