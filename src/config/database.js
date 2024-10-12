import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from './config.js';

const connectCloud = async () => {
	try {
		await mongoose.connect(config.mongoUri);
		console.log('Successful connection to the MongoDB in cloud!');
	} catch (error) {
		console.error('Database connection error: ', error);
		process.exit(1); // Exit the process with an error
	}
};

const disconnectCloud = async () => {
	try {
		await mongoose.disconnect();
		console.log('Successful disconnection from the MongoDB in cloud!');
	} catch (error) {
		console.error('Error when closing a connection to a cloud database: ', error);
	}
};

const createInMemoryServer = async () => {
	try {
		const mongoMemoryServer = await MongoMemoryServer.create();
		const uriMemoryServer = mongoMemoryServer.getUri();
		console.log('Successful creation of a local server in MongoDB memory!');
		return {
			mongoMemoryServer,
			uriMemoryServer,
		};
	} catch (error) {
		console.error('Error creating a local server in memory:', error);
		process.exit(1); // Exit the process with an error
	}
};

const stopInMemoryServer = async (mongoMemoryServer) => {
	if (!mongoMemoryServer) {
		throw new Error('mongoMemoryServer is not defined');
	}

	try {
		await mongoMemoryServer.stop();
		console.log('In-memory MongoDB closed!');
	} catch (error) {
		console.error('Error when closing a connection to a database in memory: ', error);
	}
};

const connectInMemory = async (uriMemoryServer) => {
	if (!uriMemoryServer) {
		throw new Error('uriMemoryServer is not defined');
	}

	try {
		await mongoose.connect(uriMemoryServer);
		console.log('Successful connection to the MongoDB in memory!');
	} catch (error) {
		console.error('Database connection error: ', error);
		process.exit(1); // Exit the process with an error
	}
};

const disconnectInMemory = async () => {
	try {
		await mongoose.disconnect();
		console.log('Successful disconnection from the MongoDB in memory!');
	} catch (error) {
		console.error('Error when closing a connection to a database in memory: ', error);
	}
};

const clearCollection = async (Model) => {
	if (!Model) {
		throw new Error('Model is not defined');
	}

	try {
		await Model.deleteMany();
	} catch (error) {
		console.error('Error deleting documents in a collection: ', error);
	}
};

const dropDatabase = async () => {
	try {
		if (process.env.NODE_ENV === 'test') {
			// Only drop the database in test environment
			await mongoose.connection.dropDatabase();
		} else {
			console.log('For security reasons, you can only reset the database in a test environment');
		}
	} catch (error) {
		console.error('Error dropping database: ', error);
	}
};

const MongoDB = {
	connectCloud,
	disconnectCloud,
	createInMemoryServer,
	stopInMemoryServer,
	connectInMemory,
	disconnectInMemory,
	clearCollection,
	dropDatabase,
};

export default MongoDB;
