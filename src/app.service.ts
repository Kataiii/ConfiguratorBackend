//Сервисы содержат логику и могут переиспользоваться в других компонентах
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService{
    getUsers(){
        return [{id:1, name:'Qwerty'}]
    }
}