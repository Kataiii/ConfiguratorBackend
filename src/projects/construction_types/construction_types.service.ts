import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConstructionType } from './construction_types.mosel';
import { CreateConstructionTypeDto } from './dto/create-construction_type.dto';

@Injectable()
export class ConstructionTypesService {
    constructor(@InjectModel(ConstructionType) private constructionTypesRepository: typeof ConstructionType){}

    create(dto: CreateConstructionTypeDto){

    }
}
