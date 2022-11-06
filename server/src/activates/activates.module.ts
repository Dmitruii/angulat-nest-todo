import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { ActivatesController } from './activates.controller';
import { ActivatesService } from './activates.service';
import { Activate } from './models/activate.model';

@Module({
  controllers: [ActivatesController],
  providers: [ActivatesService],
  exports: [ActivatesService],
  imports: [
    SequelizeModule.forFeature([Activate]),
  ]
})
export class ActivatesModule {}
