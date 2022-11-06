import { IsBoolean, IsNumber, IsString } from "class-validator"

export class ActivateDto {
  
  @IsBoolean()
  readonly isActive: boolean

  @IsString()
  readonly activeLink: string

  @IsNumber()
  readonly userId: number

}