import { UpdateTaskFoldersDto } from './dto/update-folder.dto';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TaskFoldersDto } from './dto/task-folders.dto';
import { TaskFoldersService } from './task_folders.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('folder')
export class TaskFoldersController {

    constructor (private taskFoldersService: TaskFoldersService) {}

    @ApiTags('Tasks folder')
    @Post()
    async createFolder(@Body() dto: TaskFoldersDto) {
        const folder = await this.taskFoldersService.createFolder(dto)

        return folder
    }

    @ApiTags('Tasks folder')
    @Get()
    async getAll() {
        const folders = await this.taskFoldersService.getAllFolders()

        return folders
    }

    @ApiTags('Tasks folder')
    @Get(':id')
    async getOne(@Param('id') id: number) {
        const folders = await this.taskFoldersService.getFolder(id)

        return folders
    }

    @ApiTags('Tasks folder')
    @Delete(':id')
    async deleteFolder(@Param('id') id: number) {
        const folder = await this.taskFoldersService.deleteFolder(id)

        if (folder === 1) {
            throw new HttpException('Removed successfully', HttpStatus.OK)
        } else {
            throw new HttpException('Already removed', HttpStatus.NOT_FOUND)
        }
    }

    @ApiTags('Tasks folder')
    @Put(':id')
    async updateFolder(
        @Param('id') id: number,
        @Body() body: UpdateTaskFoldersDto
    ) {
        const folder = await this.taskFoldersService.updateFolder(id, body)

        if (folder[0] === 1) {
            throw new HttpException('Updated successfully', HttpStatus.OK)
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

}
