import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

	private logger = new Logger('TasksController');
	constructor(private tasksService: TasksService) { }

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
		this.logger.verbose(`Fetch all tasks`);
		return this.tasksService.getTasks(filterDto);
	}

	@Get('/:id')
	getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
		this.logger.verbose(`Fetch tasks by ${id}`);
		return this.tasksService.getTaskById(id);
	}

	@Delete('/:id')
	deleteTask(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
		this.logger.verbose(`Delete tasks with ${id}`);
		return this.tasksService.deleteTask(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		this.logger.verbose(`Created new task`);
		return this.tasksService.createTask(createTaskDto);
	}

	@Patch('/:id/status')
	updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
		this.logger.verbose(`Update task by ${id}`);
		return this.tasksService.updateTaskStatus(id, status);
	}
}
