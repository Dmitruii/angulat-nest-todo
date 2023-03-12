import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { Task } from 'src/tasks/models/task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    }
  ],
  imports: [
    SequelizeModule.forFeature([Task]),
  ]
})
export class TasksModule {}
