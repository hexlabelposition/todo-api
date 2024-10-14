import database from "#config/database.js";

before(async () => {
	await database.memory.connect();
});

after(async () => {
	await database.memory.disconnect();
});

describe('Auth Routes', () => {
	it('should register a new user', async () => {
		console.log('test');
	});
});
