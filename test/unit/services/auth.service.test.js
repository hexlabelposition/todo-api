import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import service from '#services/auth.service.js';

import User from '#models/user/user.model.js';
import tokenService from '#shared/token.service.js';
import HttpError from 'http-errors';

describe('Auth Service - Unit Test', async () => {
	describe('Service - register', async () => {
		let findOneStub, saveStub, generateTokenStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			saveStub = sinon.stub(User.prototype, 'save');
			generateTokenStub = sinon.stub(tokenService, 'generateToken');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should register a new user successfully', async () => {
			findOneStub.resolves(null);
			saveStub.resolves();
			generateTokenStub.returns('fake-token');

			const result = await service.register('test@example.com', 'password123', 'user');

			expect(result).to.have.property('status', 201);
			expect(result).to.have.property('message', 'User registered successfully');
			expect(result).to.have.property('token', 'fake-token');
			expect(result.user).to.include({ email: 'test@example.com', role: 'user' });

			expect(findOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
			expect(saveStub.calledOnce).to.be.true;
			expect(generateTokenStub.calledOnceWith({ userId: sinon.match.string, role: 'user' })).to.be
				.true;
		});

		it('should throw BadRequest error if email or password is missing', async () => {
			try {
				await service.register(null, 'password123', 'user');
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Email and password are required');
			}

			expect(findOneStub.notCalled).to.be.true;
			expect(saveStub.notCalled).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});

		it('should throw Conflict error if user already exists', async () => {
			findOneStub.resolves({ email: 'test@example.com' });
			try {
				await service.register('test@example.com', 'password123', 'user');
			} catch (error) {
				expect(error).to.have.property('status', 409);
				expect(error).to.be.instanceOf(HttpError.Conflict);
				expect(error.message).to.equal('User already exists');
			}

			expect(findOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
			expect(saveStub.notCalled).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});
	});

	describe('Service - login', async () => {
		let findOneStub, generateTokenStub, comparePasswordStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			generateTokenStub = sinon.stub(tokenService, 'generateToken');
			comparePasswordStub = sinon.stub();
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should login a user successfully', async () => {
            const user = {
                id: 'user-id',
                email: 'test@example.com',
                role: 'user',
                comparePassword: comparePasswordStub.resolves(true),
            };

			findOneStub.resolves(user);
			generateTokenStub.returns('fake-token');

			const result = await service.login('test@example.com', 'password123');

			expect(result).to.have.property('status', 200);
			expect(result).to.have.property('message', 'User logged in successfully');
			expect(result).to.have.property('token', 'fake-token');
			expect(result.user).to.include({ email: 'test@example.com', role: 'user' });

			expect(findOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
			expect(generateTokenStub.calledOnceWith({ userId: sinon.match.string, role: 'user' })).to.be
				.true;
		});

		it('should throw BadRequest error if email or password is missing', async () => {
			try {
				await service.login(null, 'password123');
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Email and password are required');
			}

			expect(findOneStub.notCalled).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});

		it('should throw NotFound error if user not found', async () => {
			findOneStub.resolves(null);

			try {
				await service.login('test@example.com', 'password123');
			} catch (error) {
				expect(error).to.have.property('status', 404);
				expect(error).to.be.instanceOf(HttpError.NotFound);
				expect(error.message).to.equal('User not found');
			}

			expect(findOneStub.calledOnce).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});
	});
});
