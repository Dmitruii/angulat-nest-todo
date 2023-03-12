import { UpdateTaskDto } from './dto/update-task.dto';
import { Body, Controller, Get, HttpException, Param, Post, Put, HttpStatus, Delete } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('task')
export class TasksController {

    constructor( private tasksService: TasksService ) {}

    @ApiTags('Task')
    @Post()
    async createTask(@Body() body: CreateTaskDto) {
        const task = await this.tasksService.createTask(body)

        return task
    }

    @ApiTags('Task')
    @Get()
    async getAll() {
        const tasks = await this.tasksService.getAllTasks()

        return tasks
    }

    @ApiTags('Task')
    @Put(':id')
    async updateTask(
        @Param('id') id: number,
        @Body() body: UpdateTaskDto
    ) {
        const task = await this.tasksService.updateTask(body, id)
        
        return task
    }
    
    @ApiTags('Task')
    @Get(':id')
    async getTask(@Param('id') id: number) {
        const task = await this.tasksService.getTask(id)
        
        if (task) {
            return task
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

    @ApiTags('Task')
    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
        const task = await this.tasksService.deleteTask(id)

        if (task) {
            throw new HttpException('Removed successfully', HttpStatus.OK)
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

}
