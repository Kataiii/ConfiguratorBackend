import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompaniesController } from './companies.controller';
import { Company } from './companies.model';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    SequelizeModule.forFeature([Company])
  ],
  exports: [
    CompaniesService
  ]
})
export class CompaniesModule {}
