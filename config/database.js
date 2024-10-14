import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '#config/config.js';

let mongoMemory;

const database = {
	cloud: {
		connect: async () => {
			try {
				await mongoose.connect(config.mongoUri);
				console.log('Cloud MongoDB connected successfully.');
			} catch (error) {
				console.error('Cloud MongoDB connection error: ', error);
			}
		},
		disconnect: async () => {
			try {
				await mongoose.disconnect();
				console.log('Cloud MongoDB disconnected successfully.');
			} catch (error) {
				console.error('Cloud MongoDB disconnection error: ', error);
			}
		},
	},
	memory: {
		connect: async () => {
			try {
				mongoMemory = await MongoMemoryServer.create();
				await mongoose.connect(mongoMemory.getUri());
				console.log('Memory MongoDB connected successfully.\n');
			} catch (error) {
				console.error('Memory MongoDB connection error: ', error);
			}
		},
		disconnect: async () => {
			try {
				await mongoose.disconnect();
				await mongoMemory.stop();
				console.log('Memory MongoDB disconnected successfully.');
			} catch (error) {
				console.error('Memory MongoDB disconnection error: ', error);
			}
		},
		clear: async (Model) => {
			try {
				await Model.deleteMany({});
				console.log(`All documents in ${Model.modelName} collection have been deleted.`);
			} catch (error) {
				console.error(`Error clearing collections: ${Model.modelName}`, error);
			}
		},
		drop: async () => {
			try {
				await mongoose.connection.dropDatabase();
				console.log('Memory MongoDB dropped successfully.');
			} catch (error) {
				console.error('Memory MongoDB drop error: ', error);
			}
		},
	},
};

export default database;
