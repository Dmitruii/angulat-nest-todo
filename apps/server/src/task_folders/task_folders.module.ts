import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TaskFoldersController } from './task_folders.controller';
import { TaskFoldersService } from './task_folders.service';
import { TaskFolders } from './models/task_folders.model';
import { Task } from 'src/tasks/models/task.model';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';

@Module({
  controllers: [TaskFoldersController],
  providers: [
    TaskFoldersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    }
  ],
  imports: [
    SequelizeModule.forFeature([TaskFolders, Task]),
  ]
})
export class TaskFoldersModule {}
