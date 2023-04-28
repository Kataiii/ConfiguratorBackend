import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './cities.model';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
    constructor(@InjectModel(City) private cityRepository: typeof City){}

    async getAllCities(){
        const cities = await this.cityRepository.findAll();
        return cities;
    }

    async create(dto: CreateCityDto){
        const city = await this.cityRepository.create(dto);
        return city;
    }
}
