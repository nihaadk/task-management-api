import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	constructor(private tasksService: TasksService) { }

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto);
	}

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
	createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User
	): Promise<Task> {
		return this.tasksService.createTask(createTaskDto, user);
	}

	@Patch('/:id/status')
	updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
		return this.tasksService.updateTaskStatus(id, status);
	}
}
