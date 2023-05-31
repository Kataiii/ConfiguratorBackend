import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecoveryLink } from './recovery_links.model';
import * as uuid from "uuid";
import { AccountsService } from 'src/accounts/accounts.service';
import { MailServiceService } from '../mail-service/mail-service.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class RecoveryLinksService {
    constructor(@InjectModel(RecoveryLink) private recoveryLinksRepository: typeof RecoveryLink,
        private accountsService: AccountsService,
        private mailService: MailServiceService
        ){}

    async create(account_id: number){
        const recoveryLinkString = uuid.v4();
        await this.recoveryLinksRepository.create({recovery_link: recoveryLinkString, account_id: account_id});
        const account = await this.accountsService.getAccountById(account_id);
        await this.mailService.sendRecoveryPassword(account.email, `${process.env.CLIENT_URL}/login/reset/${recoveryLinkString}`);
    }

    async activate(recoveryLink, password){
        const recoveryModel = await this.recoveryLinksRepository.findOne({where: {recovery_link: recoveryLink}});
        // console.log(recoveryModel);
        if(!recoveryModel){
            throw new HttpException('Некорректная ссылка сброса пароля', HttpStatus.BAD_REQUEST)
        }
        let account = await this.accountsService.getAccountById(recoveryModel.account_id);
        if(!account){
            throw new HttpException( 'Некорректная сброса пароля', HttpStatus.BAD_REQUEST);
        }
        // console.log(account);
        const hashPassword = await bcryptjs.hash(password, 10);
        account.password = hashPassword;
        // console.log(account);
        await this.accountsService.fullUpdate(account);
        await this.recoveryLinksRepository.destroy({where: {recovery_link: recoveryLink}});
    }
}
