import { IsNumber } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {

    @IsString()
    @MinLength(4)
    title: string
    
    isDone: boolean = false

    @IsNumber()
    folderId: number

}