import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository
	) { }

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}

		return found;
	}

	async deleteTask(id: number): Promise<DeleteResult> {
		const deleteResult = await this.taskRepository.delete(id);

		if (deleteResult.affected === 0) {
			throw new NotFoundException(`Task with ID "${id}" not found`)
		}
		return deleteResult;
	}

	async updateTaskStatus(id: number, status: TaskStatus) {
		const task = await this.getTaskById(id);
		task.status = status;
		task.save();
		return task;
	}

	async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto, user);
	}
}
