import MongoDB from '#config/database.js';

before(async () => {
	const server =await MongoDB.createInMemoryServer();
	await MongoDB.connectInMemory(server.uriMemoryServer);
});

after(async () => {
	await MongoDB.disconnectInMemory();
	await MongoDB.stopInMemoryServer();
});

beforeEach(async () => {
	await MongoDB.dropDatabase();
});