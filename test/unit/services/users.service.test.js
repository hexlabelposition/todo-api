import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import service from '#services/users.service.js';
import User from '#models/user/user.model.js';
import tokenService from '#shared/token.service.js';
import HttpError from 'http-errors';

describe('Users Service - Unit Test', async () => {
	describe('Service - createUser', async () => {
		let findOneStub, saveStub, generateTokenStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			saveStub = sinon.stub(User.prototype, 'save');
			generateTokenStub = sinon.stub(tokenService, 'generateToken');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should create a new user successfully', async () => {
			findOneStub.resolves(null);
			saveStub.resolves();
			generateTokenStub.returns('token');

			const result = await service.createUser('test@example.com', 'password123', 'user');

			expect(result).to.have.property('status', 201);
			expect(result).to.have.property('message', 'User created successfully');
			expect(result).to.have.property('token');
			expect(result.user).to.include({ email: 'test@example.com', role: 'user' });
		});

		it('should throw BadRequest error if email or password is missing', async () => {
			try {
				await service.createUser(null, 'password123', 'user');
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
				await service.createUser('test@example.com', 'password123', 'user');
			} catch (error) {
				expect(error).to.have.property('status', 409);
				expect(error).to.be.instanceOf(HttpError.Conflict);
				expect(error.message).to.equal('User already exists');
			}

			expect(findOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
			expect(saveStub.notCalled).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});

		it('should throw InternalServerError error if error occurs', async () => {
			findOneStub.rejects();

			try {
				await service.createUser('test@example.com', 'password123', 'user');
			} catch (error) {
				expect(error).to.be.instanceOf(Error);
				expect(error.message).to.equal('Error');
			}

			expect(findOneStub.calledOnce).to.be.true;
			expect(saveStub.notCalled).to.be.true;
			expect(generateTokenStub.notCalled).to.be.true;
		});
	});

	describe('Service - getUserById', async () => {
		let findOneStub, isValidObjectIdStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			isValidObjectIdStub = sinon.stub(User, 'isValidObjectId');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get user successfully', async () => {
			const user = {
				id: 'user-id',
				email: 'test@example.com',
				role: 'user',
			};

			findOneStub.resolves(user);
			isValidObjectIdStub.returns(true);

			const result = await service.getUserById('userId');

			expect(result).to.deep.equal(user);
		});

		it('should throw BadRequest error if userId is invalid', async () => {
			isValidObjectIdStub.returns(false);

			try {
				await service.getUserById('userId');
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Invalid user ID');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findOneStub.notCalled).to.be.true;
		});

		it('should throw NotFound error if user not found', async () => {
			isValidObjectIdStub.returns(true);
			findOneStub.resolves(null);

			try {
				await service.getUserById('userId');
			} catch (error) {
				expect(error).to.have.property('status', 404);
				expect(error).to.be.instanceOf(HttpError.NotFound);
				expect(error.message).to.equal('User not found');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findOneStub.calledOnce).to.be.true;
		});
	});

	describe('Service - getAllUsers', async () => {
		let findStub;

		beforeEach(() => {
			findStub = sinon.stub(User, 'find');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should get all users successfully', async () => {
			const users = [
				{ email: 'test@example.com', role: 'user' },
				{ email: 'test@example.com', role: 'user' },
				{ email: 'test@example.com', role: 'user' },
			];

			findStub.resolves(users);

			const result = await service.getAllUsers();

			expect(result).to.deep.equal(users);

			expect(findStub.calledOnce).to.be.true;
		});

		it('should get empty array if no users found', async () => {
			findStub.resolves([]);

			const result = await service.getAllUsers();

			expect(result).to.deep.equal([]);

			expect(findStub.calledOnce).to.be.true;
		});
	});

	describe('Service - updateUser', async () => {
		let findByIdAndUpdateStub, isValidObjectIdStub;

		beforeEach(() => {
			findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate');
			isValidObjectIdStub = sinon.stub(User, 'isValidObjectId');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should update user successfully', async () => {
			const user = {
				id: 'user-id',
				email: 'test@example.com',
				role: 'user',
			};

			isValidObjectIdStub.returns(true);
			findByIdAndUpdateStub.resolves(user);

			const result = await service.updateUser('userId', user);

			expect(result).to.have.property('status', 200);
			expect(result).to.have.property('message', 'User updated successfully');
			expect(result.user).to.deep.equal(user);

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndUpdateStub.calledOnce).to.be.true;
		});

		it('should throw BadRequest error if userId is invalid', async () => {
			isValidObjectIdStub.returns(false);

			try {
				await service.updateUser('userId', {});
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Invalid user ID');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndUpdateStub.notCalled).to.be.true;
		});

		it('should throw NotFound error if user not found', async () => {
			isValidObjectIdStub.returns(true);
			findByIdAndUpdateStub.resolves(null);

			try {
				await service.updateUser('userId', {});
			} catch (error) {
				expect(error).to.have.property('status', 404);
				expect(error).to.be.instanceOf(HttpError.NotFound);
				expect(error.message).to.equal('User not found');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndUpdateStub.calledOnce).to.be.true;
		});
	});

	describe('Service - deleteUser', async () => {
		let findByIdAndDeleteStub, isValidObjectIdStub;

		beforeEach(() => {
			findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete');
			isValidObjectIdStub = sinon.stub(User, 'isValidObjectId');
		});

		afterEach(() => {
			sinon.restore();
		});

		it('should delete user successfully', async () => {
			const user = {
				id: 'user-id',
				email: 'test@example.com',
				role: 'user',
			};

			isValidObjectIdStub.returns(true);
			findByIdAndDeleteStub.resolves(user);

			const result = await service.deleteUser('userId');

			expect(result).to.have.property('status', 200);
			expect(result).to.have.property('message', 'User deleted successfully');
			expect(result.user).to.deep.equal(user);

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndDeleteStub.calledOnce).to.be.true;
		});

		it('should throw BadRequest error if userId is invalid', async () => {
			isValidObjectIdStub.returns(false);

			try {
				await service.deleteUser('userId');
			} catch (error) {
				expect(error).to.have.property('status', 400);
				expect(error).to.be.instanceOf(HttpError.BadRequest);
				expect(error.message).to.equal('Invalid user ID');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndDeleteStub.notCalled).to.be.true;
		});

		it('should throw NotFound error if user not found', async () => {
			isValidObjectIdStub.returns(true);
			findByIdAndDeleteStub.resolves(null);

			try {
				await service.deleteUser('userId');
			} catch (error) {
				expect(error).to.have.property('status', 404);
				expect(error).to.be.instanceOf(HttpError.NotFound);
				expect(error.message).to.equal('User not found');
			}

			expect(isValidObjectIdStub.calledOnce).to.be.true;
			expect(findByIdAndDeleteStub.calledOnce).to.be.true;
		});
	});
});
