import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}