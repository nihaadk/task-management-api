import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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

	// deleteTask(id: string): void {
	// 	const foundTask = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
	// }

	// updateTaskStatus(id: string, status: TaskStatus) {
	// 	const task = this.getTaskById(id);
	// 	task.status = status;
	// 	return task;
	// }

	// createTask(createTaskDto: CreateTaskDto): Task {
	// 	const { title, description } = createTaskDto;
	// 	const task: Task = {
	// 		id: uuid(),
	// 		title,
	// 		description,
	// 		status: TaskStatus.OPEN
	// 	};
	// 	this.tasks.push(task);
	// 	return task;
	// }
}
