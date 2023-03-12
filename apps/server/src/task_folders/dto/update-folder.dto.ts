import { IsOptional } from "class-validator"
import { TaskFoldersDto } from "./task-folders.dto"

export class UpdateTaskFoldersDto extends TaskFoldersDto {

    @IsOptional()
    readonly color: string

}