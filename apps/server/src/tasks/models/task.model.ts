import { TaskFolders } from './../../task_folders/models/task_folders.model';
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IsOptional } from 'class-validator';

interface TaskCreationAttr {
    title: string
    isDone: boolean
    folderId: number
}

@Table({tableName: 'tasks', timestamps: false})
export class Task extends Model<Task, TaskCreationAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING})
    title: string
    
    @Default(false)
    @Column({type: DataType.BOOLEAN})
    isDone: boolean

    @ForeignKey(() => TaskFolders)
    @Column({type: DataType.INTEGER})
    folderId: number
    
    @BelongsTo(() => TaskFolders)
    folder: TaskFolders

}