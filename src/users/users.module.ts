import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from 'src/accounts/accounts.module';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => FilesModule),
    forwardRef(() => AccountsModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
