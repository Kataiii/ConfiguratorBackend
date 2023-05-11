import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailServiceService {
    transporter: any;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls:{
            rejectUnauthorized: false
            }
        })
    }

    async sendActivationMail(to: string, link: string){
        let mailOptions = {
            from: process.env.SMTP_USER, 
            to: to, 
            subject: 'Активация аккаунта на сайте ', 
            html: 
            `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        };
        
        this.transporter.sendMail(mailOptions, function (error, success) {
            // if (error) {
            //     console.log(error);
            // }
            // else {
            //     console.log("Server is ready to take our messages");
            // }
        });
    }
}
