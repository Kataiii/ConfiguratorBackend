import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './cities.model';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
    constructor(@InjectModel(City) private cityRepository: typeof City){}

    async getAllCities(){
        const cities = await this.cityRepository.findAll({
            order:[["name", "ASC"]]
        });
        return cities;
    }

    async getAllCitiesWithPagination(page: number, limit: number){
        return await this.cityRepository.findAll({
            limit: limit,
            offset: (page - 1)*limit,
            order: [["name", "ASC"]]
        })
    }

    async countAllCities(){
        return (await this.cityRepository.findAndCountAll()).count;
    }

    async filtersCities(query: string){
        const cities = await this.cityRepository.findAll({
            order: [["name", "ASC"]]  
        });
        return cities.filter(city => city.name.toLowerCase().includes(query.toLowerCase()));
    }

    async create(dto: CreateCityDto){
        const city = await this.cityRepository.create(dto);
        return city;
    }

    async getById(id: number){
        return await this.cityRepository.findOne({where: {id: id}});
    }
}
