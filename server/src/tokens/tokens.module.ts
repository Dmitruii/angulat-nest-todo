import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Token } from './models/token.model';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([User, Token]),
  ],
  exports: [
    TokensService
  ]
})
export class TokensModule {}
