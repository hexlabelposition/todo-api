import { connect } from "mongoose";
import config from "./config.js";

/**
 * Establishes a connection to a MongoDB database.
 *
 * @return {Promise<void>} Resolves when the connection is successful, rejects with an error message otherwise.
 */
const connectDB = async () => {
  try {
    await connect(config.mongoUri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process with an error
  }
};

export default connectDB;
