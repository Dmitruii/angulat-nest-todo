import { IsOptional } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {

    @IsOptional()
    @IsString()
    @MinLength(4)
    title: string
    
    @IsOptional()
    isDone: boolean = false

}