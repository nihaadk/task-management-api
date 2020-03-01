import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) { }

	// @Get()
	// getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
	// 	if (Object.keys(filterDto).length) {
	// 		return this.tasksService.getTasksWithFilters(filterDto);
	// 	} else {
	// 		return this.tasksService.getTasks();
	// 	}
	// }

	@Get('/:id')
	getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
		return this.tasksService.getTaskById(id);
	}

	@Delete('/:id')
	deleteTask(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
		return this.tasksService.deleteTask(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.createTask(createTaskDto);
	}

	// @Patch('/:id/status')
	// updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
	// 	return this.tasksService.updateTaskStatus(id, status);
	// }
}
