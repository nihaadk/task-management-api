import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getAllTasks(): Task[] {
		return this.tasksService.getAllTasks();
	}

	@Post()
	createTask(@Body('title') title, @Body('description') description): Task {
		return this.tasksService.createTask(title, description);
	}

	/*
	Example: if we not extract body attributes
	@Post()
	createTask(@Body() body) {
		console.log('body', body);
    }
    */
}
