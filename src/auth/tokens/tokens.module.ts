import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokensController } from './tokens.controller';
import { Token } from './tokens.model';
import { TokensService } from './tokens.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    SequelizeModule.forFeature([Token])
  ],
  exports: [
    TokensService
  ]
})
export class TokensModule {}
