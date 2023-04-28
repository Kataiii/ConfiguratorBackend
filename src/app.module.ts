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
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { CompanyTypesModule } from './companies/company_types/company_types.module';
import { CompanyType } from "./companies/company_types/company_types.model";
import { Company } from "./companies/companies.model";
import { EmployeesModule } from './companies/employees/employees.module';
import { Employee } from "./companies/employees/employees.model";
import { AuthModule } from './auth/auth.module';


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
            models: [Account, Role, City, AccountRoles, User, CompanyType, Company, Employee],
            autoLoadModels: true
          }),
        AccountsModule,
        CitiesModule,
        RolesModule,
        UsersModule,
        CompaniesModule,
        CompanyTypesModule,
        EmployeesModule,
        AuthModule
    ]
})
export class AppModule{

}