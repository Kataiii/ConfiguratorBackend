import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CitiesController } from './cities.controller';
import { City } from './cities.model';
import { CitiesService } from './cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [
    SequelizeModule.forFeature([City])
  ]
})
export class CitiesModule {}
