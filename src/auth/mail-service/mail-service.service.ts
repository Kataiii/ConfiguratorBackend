import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailServiceService {
    transporter: any;

    constructor(){
        this.transporter = nodemailer.createTrancport({
            host:
            port:
            secure: false,
            auth: {
                
            }
        })
    }

    sendActivationMail(to: string, link: string){

    }
}
