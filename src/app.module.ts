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
import { ProjectsModule } from './projects/projects.module';
import { ConstructionTypesModule } from './projects/construction_types/construction_types.module';
import { ConstructionType } from "./projects/construction_types/construction_types.model";
import { Project } from "./projects/projects.model";
import { TokensModule } from './auth/tokens/tokens.module';
import { Token } from "./auth/tokens/tokens.model";
import { ActivationLinksModule } from './auth/activation_links/activation_links.module';
import { ActivationLink } from "./auth/activation_links/activation_links.model";
import { MailServiceModule } from './auth/mail-service/mail-service.module';
import { FilesModule } from './files/files.module';


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
            username: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [Account, 
                    Role, 
                    City, 
                    AccountRoles, 
                    User, 
                    CompanyType, 
                    Company, 
                    Employee, 
                    ConstructionType, 
                    Project,
                    Token,
                    ActivationLink
                ],
            autoLoadModels: true
          }),
        AccountsModule,
        CitiesModule,
        RolesModule,
        UsersModule,
        CompaniesModule,
        CompanyTypesModule,
        EmployeesModule,
        AuthModule,
        ProjectsModule,
        ConstructionTypesModule,
        TokensModule,
        ActivationLinksModule,
        MailServiceModule,
        FilesModule
    ]
})
export class AppModule{

}