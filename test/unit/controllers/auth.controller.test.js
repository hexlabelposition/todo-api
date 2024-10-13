import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import controller from '#controllers/auth.controller.js';
import service from '#services/auth.service.js';
import HttpError from 'http-errors';

describe('Auth Controller - Unit Test', async () => {
	describe('Controller - register', async () => {
		let registerStub;
		let request, response, next;

		beforeEach(() => {
			registerStub = sinon.stub(service, 'register');

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

		it('should register successfully', async () => {
			registerStub.resolves({
				status: 201,
				message: 'User registered successfully',
				token: 'fake-token',
				user: { email: 'test@example.com', role: 'user' },
			});

			await controller.register(request, response, next);

			expect(registerStub.calledOnceWith('test@example.com', 'password123', 'user')).to.be.true;
			expect(response.status.calledOnceWith(201)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 201,
					message: 'User registered successfully',
					token: 'fake-token',
					user: { email: 'test@example.com', role: 'user' },
				}),
			).to.be.true;

			expect(next.called).to.be.false;
		});

		it('should throw BadRequest error if email or password is missing', async () => {
			const error = new HttpError.BadRequest('Email and password are required');
			registerStub.rejects(error);

			try {
				await controller.register(request, response, next);
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Email and password are required');
			}

			expect(next.calledWith(error)).to.be.true;
		});

		it('should throw Conflict error if user already exists', async () => {
			const error = new HttpError.Conflict('User already exists');
			registerStub.rejects(error);

			try {
				await controller.register(request, response, next);
			} catch (error) {
				expect(error).to.have.property('status', 409);
				expect(error).to.be.instanceOf(HttpError.Conflict);
				expect(error.message).to.equal('User already exists');
			}

			expect(next.calledWith(error)).to.be.true;
		});
	});

	describe('Controller - login', async () => {
		let loginStub;
		let request, response, next;

		beforeEach(() => {
			loginStub = sinon.stub(service, 'login');

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

		it('should login successfully', async () => {
			loginStub.resolves({
				status: 200,
				message: 'User logged in successfully',
				token: 'fake-token',
				user: { email: 'test@example.com', role: 'user' },
			});

			await controller.login(request, response, next);

			expect(loginStub.calledOnceWith('test@example.com', 'password123')).to.be.true;
			expect(response.status.calledOnceWith(200)).to.be.true;
			expect(
				response.json.calledOnceWith({
					status: 200,
					message: 'User logged in successfully',
					token: 'fake-token',
					user: { email: 'test@example.com', role: 'user' },
				}),
			).to.be.true;

			expect(next.called).to.be.false;
		});

		it('should throw BadRequest error if email or password is missing', async () => {
			const error = new HttpError.BadRequest('Email and password are required');
			loginStub.rejects(error);

			try {
				await controller.login(request, response, next);
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Email and password are required');
			}

			expect(next.calledWith(error)).to.be.true;
		});

		it('should throw Unauthorized error if invalid password', async () => {
			const error = new HttpError.Unauthorized('Invalid password');
			loginStub.rejects(error);

			try {
				await controller.login(request, response, next);
			} catch (error) {
				expect(error).to.have.property('status', 401);
				expect(error).to.be.instanceOf(HttpError.Unauthorized);
				expect(error.message).to.equal('Invalid password');
			}

			expect(next.calledWith(error)).to.be.true;
		});
	});
});
