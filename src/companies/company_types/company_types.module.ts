import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyTypesController } from './company_types.controller';
import { CompanyType } from './company_types.model';
import { CompanyTypesService } from './company_types.service';

@Module({
  controllers: [CompanyTypesController],
  providers: [CompanyTypesService],
  imports: [
    SequelizeModule.forFeature([CompanyType])
  ]
})
export class CompanyTypesModule {}
