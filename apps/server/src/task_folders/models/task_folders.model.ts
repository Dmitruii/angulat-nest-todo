import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "src/tasks/models/task.model";

interface TaskFoldersCreationAttr {
  name: string
  color: string
}

@Table({tableName: 'task_folders', timestamps: false})
export class TaskFolders extends Model<TaskFolders, TaskFoldersCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @Column({type: DataType.STRING, allowNull: false})
  color: string

  @HasMany(() => Task)
  tasks: Task[]

}