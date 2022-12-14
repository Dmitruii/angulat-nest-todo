import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface TokenCreationAttr {
  tokenRefresh: string
}

@Table({tableName: 'tokens', timestamps: false})
export class Token extends Model<Token, TokenCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  tokenRefresh: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER, allowNull: false
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

}