import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountRoles } from "./account-roles/account-roles.model";
import { Account } from "./accounts/account.model";
import { AccountsModule } from './accounts/accounts.module';
import { City } from "./cities/cities.model";
import { CitiesModule } from './cities/cities.module';
import { Role } from "./roles/roles.model";
import { RolesModule } from './roles/roles.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Account, Role, City, AccountRoles],
            autoLoadModels: true
          }),
        AccountsModule,
        CitiesModule,
        RolesModule,
    ]
})
export class AppModule{

}