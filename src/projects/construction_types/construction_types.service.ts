import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConstructionType } from './construction_types.model';
import { CreateConstructionTypeDto } from './dto/create-construction_type.dto';

@Injectable()
export class ConstructionTypesService {
    constructor(@InjectModel(ConstructionType) private constructionTypesRepository: typeof ConstructionType){}

    async create(dto: CreateConstructionTypeDto){
        return await this.constructionTypesRepository.create(dto);
    }

    async getAll(){
        return await this.constructionTypesRepository.findAll();
    }

    async getByName(name: string){
        return await this.constructionTypesRepository.findOne({where: {name: name}});
    }
}
