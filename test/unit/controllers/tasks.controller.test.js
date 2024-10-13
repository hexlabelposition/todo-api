import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import controller from '#controllers/tasks.controller.js';
import service from '#services/tasks.service.js';

describe('Task Controller - Unit Test', async () => {
	describe('Controller - createTask', async () => {
		let createTaskStub;
		let request, response, next;

		beforeEach(() => {
			createTaskStub = sinon.stub(service, 'createTask');

			request = {
				body: {
					title: 'test title',
					description: 'test description',
				},
			};

			response = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			};

			next = sinon.stub();
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should create task successfully', async () => {
			createTaskStub.resolves({
				status: 201,
				message: 'Task created successfully',
				task: {
					title: 'test title',
					description: 'test description',
				},
			});

			await controller.createTask(request, response, next);

			expect(createTaskStub.calledWith(request.body.title, request.body.description)).to.be.true;
			expect(response.status.calledWith(201)).to.be.true;
			expect(
				response.json.calledWith({
					status: 201,
					message: 'Task created successfully',
					task: { title: 'test title', description: 'test description' },
				}),
			).to.be.true;

			expect(createTaskStub.calledOnce).to.be.true;
			expect(next.called).to.be.false;
		});

		it('should throw an error', async () => {
			const error = new Error('test error');
			createTaskStub.rejects(error);

			try {
				await controller.createTask(request, response, next);
			} catch (error) {
				expect(error).to.be.instanceOf(Error);
				expect(error.message).to.equal('test error');
			}

			expect(createTaskStub.calledOnce).to.be.true;
			expect(next.called).to.be.true;
			expect(next.calledWith(error)).to.be.true;
		});
	});

	describe('Controller - getTaskById', async () => {
		let getTaskByIdStub;
		let request, response, next;

		beforeEach(() => {
			getTaskByIdStub = sinon.stub(service, 'getTaskById');

			request = {
				params: {
					taskId: 1,
				},
			};

			response = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			};

			next = sinon.stub();
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get task successfully', async () => {
			getTaskByIdStub.resolves({
				status: 200,
				message: 'Task retrieved successfully',
				task: {
					title: 'test title',
					description: 'test description',
				},
			});

			await controller.getTaskById(request, response, next);

			expect(getTaskByIdStub.calledWith(1)).to.be.true;
			expect(response.status.calledWith(200)).to.be.true;
			expect(
				response.json.calledWith({
					status: 200,
					message: 'Task retrieved successfully',
					task: { title: 'test title', description: 'test description' },
				}),
			).to.be.true;

			expect(getTaskByIdStub.calledOnce).to.be.true;
			expect(next.called).to.be.false;
		});
	});

	describe('Controller - getAllTasks', async () => {
		let getAllTasksStub;
		let request, response, next;

		beforeEach(() => {
			getAllTasksStub = sinon.stub(service, 'getAllTasks');

			request = {
				body: {
					title: 'test title',
					description: 'test description',
				},
			};

			response = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			};

			next = sinon.stub();
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get all tasks successfully', async () => {
			getAllTasksStub.resolves({
				status: 200,
				message: 'Tasks retrieved successfully',
				tasks: [
					{
						title: 'test title',
						description: 'test description',
					},
				],
			});

			await controller.getAllTasks(request, response, next);

			expect(getAllTasksStub.calledWith()).to.be.true;
			expect(response.status.calledWith(200)).to.be.true;
			expect(
				response.json.calledWith({
					status: 200,
					message: 'Tasks retrieved successfully',
					tasks: [
						{
							title: 'test title',
							description: 'test description',
						},
					],
				}),
			).to.be.true;

			expect(getAllTasksStub.calledOnce).to.be.true;
			expect(next.called).to.be.false;
		});
	});

	describe('Controller - updateTask', async () => {
        let updateTaskStub;
        let request, response, next;

        beforeEach(() => {
            updateTaskStub = sinon.stub(service, 'updateTask');

            request = {
                params: {
                    taskId: 1,
                },
                body: {
                    title: 'test title',
                    description: 'test description',
                },
            };

            response = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            next = sinon.stub();
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should update task successfully', async () => {
            updateTaskStub.resolves({
                status: 200,
                message: 'Task updated successfully',
            });

            await controller.updateTask(request, response, next);

            expect(updateTaskStub.calledWith(1, 'test title', 'test description')).to.be.true;
            expect(response.status.calledWith(200)).to.be.true;
            expect(
                response.json.calledWith({
                    status: 200,
                    message: 'Task updated successfully',
                }),
            ).to.be.true;

            expect(updateTaskStub.calledOnce).to.be.true;
            expect(next.called).to.be.false;
        });
    });

	describe('Controller - deleteTask', async () => {
        let deleteTaskStub;
        let request, response, next;

        beforeEach(() => {
            deleteTaskStub = sinon.stub(service, 'deleteTask');

            request = {
                params: {
                    taskId: 1,
                },
            };

            response = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            next = sinon.stub();
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should delete task successfully', async () => {
            deleteTaskStub.resolves({
                status: 200,
                message: 'Task deleted successfully',
            });

            await controller.deleteTask(request, response, next);

            expect(deleteTaskStub.calledWith(1)).to.be.true;
            expect(response.status.calledWith(200)).to.be.true;
            expect(
                response.json.calledWith({
                    status: 200,
                    message: 'Task deleted successfully',
                }),
            ).to.be.true;

            expect(deleteTaskStub.calledOnce).to.be.true;
            expect(next.called).to.be.false;
        });

    });
});
