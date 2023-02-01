import { TokensModule } from './../tokens/tokens.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivatesModule } from 'src/activates/activates.module';
import { Activate } from 'src/activates/models/activate.model';
import { Token } from 'src/tokens/models/token.model';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => TokensModule),
    ActivatesModule,
    SequelizeModule.forFeature([User, Token, Activate]),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
