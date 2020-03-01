import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {

	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository
	) { }

	// getTasks(): Task[] {
	// 	return this.tasks;
	// }

	// getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
	// 	const { status, search } = filterDto;

	// 	let tasks = this.getTasks();

	// 	if (status) {
	// 		tasks = tasks.filter((task) => task.status === status);
	// 	}

	// 	if (search) {
	// 		tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
	// 	}

	// 	return tasks;
	// }

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

	// updateTaskStatus(id: string, status: TaskStatus) {
	// 	const task = this.getTaskById(id);
	// 	task.status = status;
	// 	return task;
	// }

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}
}
