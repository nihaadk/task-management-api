export class CreateTaskDto {
	title: string;
	description: string;
}

export enum TaskStatus {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE'
}
