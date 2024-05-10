import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { mapSortFactor } from 'src/utils/SortMaps';
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

    async getByProjectId(projectId: number | string){
        return await this.accountsProjectsRepository.findOne({where: {project_id: projectId}})
    }

    async getProjectsByAccountAndRoleIdPagination(account_id: number, role_id: number, page: number, limit: number, sortFactor: string, sortOrder: string){
        if(sortFactor === mapSortFactor.get("По дате")){
            return await this.accountsProjectsRepository.findAll({
                where: {
                    account_id: account_id,
                    role_id: role_id
                },
                order: [
                    [sortFactor, sortOrder]
                ],
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        return await this.accountsProjectsRepository.findAll({
            where: {
                account_id: account_id,
                role_id: role_id
            }
        });
    }

    async countAllProjectByAccountAndRole(account_id: number,role_id: number){
        return (await this.accountsProjectsRepository.findAndCountAll({
            where: {
                account_id: account_id,
                role_id: role_id
            }
        })).count;
    }
}
