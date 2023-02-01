import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface ActivateCreationAttr {
  isActive: boolean
  activeLink: string
}

@Table({tableName: 'activates', timestamps: false})
export class Activate extends Model<Activate, ActivateCreationAttr> {
  
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
  isActive: boolean

  @Column({type: DataType.STRING})
  activeLink: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER, allowNull: false
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

}