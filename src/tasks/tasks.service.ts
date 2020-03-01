import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getTasks(): Task[] {
		return this.tasks;
	}

	getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const { status, search } = filterDto;

		let tasks = this.getTasks();

		if (status) {
			tasks = tasks.filter((task) => task.status === status);
		}

		if (search) {
			tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
		}

		return tasks;
	}

	getTaskById(id: string): Task {
		return this.tasks.find((task) => task.id === id);
	}

	deleteTask(id: string): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}

	updateTaskStatus(id: string, status: TaskStatus) {
		const task = this.getTaskById(id);
		task.status = status;
		return task;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN
		};
		this.tasks.push(task);
		return task;
	}
}
