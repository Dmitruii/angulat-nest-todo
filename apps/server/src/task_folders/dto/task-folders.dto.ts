import { IsString, MinLength } from "class-validator"

export class TaskFoldersDto {

    @IsString()
    @MinLength(4)
    readonly name: string

    @IsString()
    readonly color: string

}