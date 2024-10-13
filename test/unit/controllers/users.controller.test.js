import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import controller from '#controllers/users.controller.js';
import service from '#services/users.service.js';

describe('User Controller - Unit Test', async () => {
	describe('Controller - createUser', async () => {
		let createUserStub;
		let request, response, next;

		beforeEach(() => {
			createUserStub = sinon.stub(service, 'createUser');

			request = {
				body: {
					email: 'test@example.com',
					password: 'password123',
					role: 'user',
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

		it('should create user successfully', async () => {
			createUserStub.resolves({
				status: 201,
				message: 'User created successfully',
				user: request.body,
			});

			await controller.createUser(request, response, next);

			expect(createUserStub.calledOnceWith('test@example.com', 'password123', 'user')).to.be.true;
			expect(response.status.calledOnceWith(201)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 201,
					message: 'User created successfully',
					user: request.body,
				}),
			).to.be.true;

			expect(createUserStub.calledOnce).to.be.true;
			expect(next.notCalled).to.be.true;
		});
	});

	describe('Controller - getUserById', async () => {
		let getUserByIdStub;
		let request, response, next;

		beforeEach(() => {
			getUserByIdStub = sinon.stub(service, 'getUserById');

			request = {
				params: {
					userId: 'user-id',
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

		it('should get user successfully', async () => {
			getUserByIdStub.resolves({
				status: 200,
				message: 'User retrieved successfully',
				user: {
					id: 'user-id',
					email: 'test@example.com',
					role: 'user',
				},
			});

			await controller.getUserById(request, response, next);

			expect(getUserByIdStub.calledOnceWith('user-id')).to.be.true;
			expect(response.status.calledOnceWith(200)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 200,
					message: 'User retrieved successfully',
					user: {
						id: 'user-id',
						email: 'test@example.com',
						role: 'user',
					},
				}),
			).to.be.true;

			expect(getUserByIdStub.calledOnce).to.be.true;
			expect(next.notCalled).to.be.true;
		});
	});

	describe('Controller - getAllUsers', async () => {
		let getAllUsersStub;
		let request, response, next;

		beforeEach(() => {
			getAllUsersStub = sinon.stub(service, 'getAllUsers');

			request = {
				body: {
					email: 'test@example.com',
					password: 'password123',
					role: 'user',
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

		it('should get all users successfully', async () => {
			getAllUsersStub.resolves({
				status: 200,
				message: 'Users retrieved successfully',
				users: [
					{
						id: 'user-id',
						email: 'test@example.com',
						role: 'user',
					},
				],
			});

			await controller.getAllUsers(request, response, next);

			expect(getAllUsersStub.calledOnce).to.be.true;
			expect(next.notCalled).to.be.true;
		});
	});

	describe('Controller - updateUser', async () => {
		let updateUserStub;
		let request, response, next;

		beforeEach(() => {
			updateUserStub = sinon.stub(service, 'updateUser');

			request = {
				params: {
					userId: 'user-id',
				},
				body: {
					email: 'test@example.com',
					password: 'password123',
					role: 'user',
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

		it('should update user successfully', async () => {
			updateUserStub.resolves({
				status: 200,
				message: 'User updated successfully',
				user: {
					id: 'user-id',
					email: 'test@example.com',
					role: 'user',
				},
			});

			await controller.updateUser(request, response, next);

			expect(updateUserStub.calledOnceWith('user-id', 'test@example.com', 'password123', 'user')).to
				.be.true;
			expect(response.status.calledOnceWith(200)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 200,
					message: 'User updated successfully',
					user: {
						id: 'user-id',
						email: 'test@example.com',
						role: 'user',
					},
				}),
			).to.be.true;

			expect(updateUserStub.calledOnce).to.be.true;
			expect(next.notCalled).to.be.true;
		});
	});

	describe('Controller - deleteUser', async () => {
		let deleteUserStub;
		let request, response, next;

		beforeEach(() => {
			deleteUserStub = sinon.stub(service, 'deleteUser');

			request = {
				params: {
					userId: 'user-id',
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

		it('should delete user successfully', async () => {
			deleteUserStub.resolves({
				status: 200,
				message: 'User deleted successfully',
				user: {
					id: 'user-id',
					email: 'test@example.com',
					role: 'user',
				},
			});

			await controller.deleteUser(request, response, next);

			expect(deleteUserStub.calledOnceWith('user-id')).to.be.true;
			expect(response.status.calledOnceWith(200)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 200,
					message: 'User deleted successfully',
					user: {
						id: 'user-id',
						email: 'test@example.com',
						role: 'user',
					},
				}),
			).to.be.true;

			expect(deleteUserStub.calledOnce).to.be.true;
			expect(next.notCalled).to.be.true;
		});
	});
});
