import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountsProjects } from './accounts-ptojects.model';
import { CreateAccountsProjectsDto } from './dto/create_accounts-projects.dto';

@Injectable()
export class AccountsProjectsService {
    constructor(@InjectModel(AccountsProjects) private accountsProjectsRepository: typeof AccountsProjects,){}

    async create(dto: CreateAccountsProjectsDto){
        return await this.accountsProjectsRepository.create(dto);
    }

    async getProjectsByAccountId(account_id: number){
        return await this.accountsProjectsRepository.findAll({where: {account_id: account_id}});
    }
}
