
import { Task } from 'src/tasks/models/task.model';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    constructor (@InjectModel(Task) private taskRepository: typeof Task) {}

    async createTask(dto: CreateTaskDto) {
        const task = this.taskRepository.create(dto)

        return dto
    }

    async getAllTasks() {
        const tasks = await this.taskRepository.findAll()

        return tasks
    }

    async updateTask(dto: UpdateTaskDto, id: number) {
        const task = await this.taskRepository.update(dto, { where: { id } })

        return task
    }

    async getTask(id: number) {
        const task = await this.taskRepository.findByPk(id)

        return task
    }

    async deleteTask(id: number) {
        const task = await this.taskRepository.destroy({ where: { id } })

        return task
    }

}
