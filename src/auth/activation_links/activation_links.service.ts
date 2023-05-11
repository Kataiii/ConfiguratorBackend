import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivationLink } from './activation_links.model';
import * as uuid from "uuid";
import { MailServiceService } from '../mail-service/mail-service.service';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class ActivationLinksService {
    constructor(@InjectModel(ActivationLink) private activationLinksRepository: typeof ActivationLink,
        private mailService: MailServiceService,
        private accountsService: AccountsService){}

    async create(account_id: number){
        const activationLinkString = uuid.v4();
        await this.activationLinksRepository.create({activation_link: activationLinkString, account_id: account_id});
        const account = await this.accountsService.getAccountById(account_id);
        await this.mailService.sendActivationMail(account.email, `${process.env.API_URL}/api/activation-links/activationLinkString`);
    }

    async activate(activationLink){
        const activationModel = await this.activationLinksRepository.findOne({where: {activation_link: activationLink}});
        if(!activationModel){
            throw new HttpException('Некорректная ссылка активации', HttpStatus.BAD_REQUEST)
        }
        let account = await this.accountsService.getAccountById(activationModel.account_id);
        if(!account){
            throw new HttpException( 'Некорректная ссылка активации', HttpStatus.BAD_REQUEST);
        }
        account.is_checked_email = true;
        await this.accountsService.Update( account, account.id);
    }
}
