import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConstructionTypesController } from './construction_types.controller';
import { ConstructionType } from './construction_types.mosel';
import { ConstructionTypesService } from './construction_types.service';

@Module({
    controllers: [ConstructionTypesController],
    providers: [ConstructionTypesService],
    imports:[
      SequelizeModule.forFeature([ConstructionType]),
    ]
})
export class ConstructionTypesModule {}
