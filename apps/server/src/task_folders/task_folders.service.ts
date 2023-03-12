import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskFoldersDto } from './dto/task-folders.dto';
import { UpdateTaskFoldersDto } from './dto/update-folder.dto';
import { TaskFolders } from './models/task_folders.model';

@Injectable()
export class TaskFoldersService {

    constructor( @InjectModel(TaskFolders) private taskFolders: typeof TaskFolders ) {}

    async createFolder(dto: TaskFoldersDto) {
        const folder = await this.taskFolders.create(dto)

        return folder
    }

    async getAllFolders() {
        const folders = await this.taskFolders.findAll()

        return folders
    }
    
    async getFolder(id: number) {
        const folder = await this.taskFolders.findByPk(id)

        return folder
    }
    
    async deleteFolder(id: number) {
        const folder = await this.taskFolders.destroy({ where: { id } })

        return folder
    }

    async updateFolder(id: number, dto: UpdateTaskFoldersDto) {
        const folder = await this.taskFolders.update(dto, { where: { id } }) 

        return folder
    }

}
