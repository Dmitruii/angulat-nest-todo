import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, Model, Table } from "sequelize-typescript"

interface UserCreationAttrs {
  email: string
  password: string
  name: string
  activeId: number
  tokenId: number
}

@Table({tableName: 'users', timestamps: false})
export class User extends Model<User, UserCreationAttrs> {
  
  @ApiProperty({
    type: Number,
    description: 'Uniqie user id',
    example: '1'
  })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @Column({type: DataType.STRING, defaultValue: ''})
  name: string
  
}