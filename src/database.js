import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import config from "./config.js";

let mongoServer;

const connectDB = async () => {
  const env = process.env.NODE_ENV || 'development';

  try {
    if (env === 'test') {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log("Connected to in-memory MongoDB!");
    } else {
      await mongoose.connect(config.mongoUri);
      console.log("Connected to cloud MongoDB!");
    }
  } catch (error) {
    console.error('Database connection error', error);
    process.exit(1); // Exit the process with an error
  }
};

const closeDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      await mongoServer.stop();
      console.log("In-memory MongoDB closed!");
    } else {
      await mongoose.disconnect();
      console.log("Cloud MongoDB connection closed!");
    }
  } catch (error) {
    console.error('Error while closing the database connection', error);
  }
};

export { connectDB, closeDB };