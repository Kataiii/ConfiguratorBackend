import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

//Контроллер не содержит логики, он остается тонким, вся логика в сервисах
//ПРинимать какой-то запрос, возвращать какой-то ответ
@Controller('/api')
export class AppController{
    constructor(private appService: AppService){}

    @Get('/users')
    getUsers() {
        return this.appService.getUsers();
    }
}