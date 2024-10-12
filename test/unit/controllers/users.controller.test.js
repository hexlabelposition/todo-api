import controller from '#controllers/users.controller.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('User Controller - Unit Test', async () => {
	let request, response, next;

	beforeEach(() => {
		request = {
			body: {
				username: 'test',
				password: 'test'
			}
		};
		response = {
			status: sinon.spy(),
			json: sinon.spy()
		};
		next = sinon.spy();
	});

	it('should return 200 and user data on success', async () => {

	});

});