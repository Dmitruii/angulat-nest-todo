import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsEmail()
  readonly email: string

  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 4
  })
  @IsString()
  @MinLength(4)
  readonly password: string

  @ApiProperty({
    type: String,
    description: 'User name',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly name: string
  
}