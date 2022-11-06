import { Activate } from './activates/models/activate.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model'
import { ActivatesModule } from './activates/activates.module';
import { TokensModule } from './tokens/tokens.module';
import { Token } from 'src/tokens/models/token.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Token, Activate],
      autoLoadModels: true
    }),
    UsersModule,
    ActivatesModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
