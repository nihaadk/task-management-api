export class Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;

	constructor(_id: string, _title: string, _description: string, _status: TaskStatus) {
		this.id = _id;
		this.title = _title;
		this.description = _description;
		this.status = _status;
	}
}

export enum TaskStatus {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE'
}
