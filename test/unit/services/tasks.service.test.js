import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import service from '#services/tasks.service.js';
import Task from '#models/task/task.model.js';

describe('Tasks Service - Unit Test', async () => {
	describe('Service - createTask', async () => {
		let saveStub;

		beforeEach(() => {
			saveStub = sinon.stub(Task.prototype, 'save');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should create a new task successfully', async () => {
			saveStub.resolves();

			const reulst = await service.createTask('Task 1', 'Description 1');

			expect(reulst).to.have.property('status', 201);
			expect(reulst).to.have.property('message', 'Task created successfully');
			expect(reulst).to.have.property('task');
			expect(reulst.task).to.have.property('title', 'Task 1');
			expect(reulst.task).to.have.property('description', 'Description 1');

			expect(saveStub.calledOnce).to.be.true;
		});
	});

	describe('Service - getTaskById', async () => {
		let findByIdStub;

		beforeEach(() => {
			findByIdStub = sinon.stub(Task, 'findById');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get task by id successfully', async () => {
			findByIdStub.resolves({ title: 'Task 1', description: 'Description 1' });

			const result = await service.getTaskById('task-id');

			expect(result).to.have.property('title', 'Task 1');
			expect(result).to.have.property('description', 'Description 1');

			expect(findByIdStub.calledOnce).to.be.true;
		});
	});

	describe('Service - getAllTasks', async () => {
		let findStub;

		beforeEach(() => {
			findStub = sinon.stub(Task, 'find');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get all tasks successfully', async () => {
			const tasks = [
				{ title: 'Task 1', description: 'Description 1' },
				{ title: 'Task 2', description: 'Description 2' },
				{ title: 'Task 3', description: 'Description 3' },
			];

			findStub.resolves(tasks);

			const result = await service.getAllTasks();

			expect(result).to.deep.equal(tasks);

			expect(findStub.calledOnce).to.be.true;
		});
	});

	describe('Service - updateTask', async () => {
		let findByIdAndUpdateStub;

		beforeEach(() => {
			findByIdAndUpdateStub = sinon.stub(Task, 'findByIdAndUpdate');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should update task successfully', async () => {
			findByIdAndUpdateStub.resolves({ title: 'Task 1', description: 'Description 1' });

			const result = await service.updateTask('taskId', 'Task 2', 'Description 2');

			expect(result).to.have.property('status', 200);
			expect(result).to.have.property('message', 'Task updated successfully');

			expect(findByIdAndUpdateStub.calledOnce).to.be.true;
		});
	});

	describe('Service - deleteTask', async () => {
		let findByIdAndDeleteStub;

		beforeEach(() => {
			findByIdAndDeleteStub = sinon.stub(Task, 'findByIdAndDelete');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should delete task successfully', async () => {
			findByIdAndDeleteStub.resolves({ title: 'Task 1', description: 'Description 1' });

			const result = await service.deleteTask('taskId');

			expect(result).to.have.property('status', 200);
			expect(result).to.have.property('message', 'Task deleted successfully');

			expect(findByIdAndDeleteStub.calledOnce).to.be.true;
		});
	});
});
