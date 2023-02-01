import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginUserDto {

    @ApiProperty({
        type: String,
        description: 'User email',
    })
    @IsEmail()
    readonly email: string

    @ApiProperty({
        type: String,
        description: 'User password',
    })
    @IsString()
    readonly password: string

}