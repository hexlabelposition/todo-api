import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbOptions = process.env.DB_OPTIONS;
const dbAppName = process.env.DB_APP_NAME;

const mongoUri =
	dbUser && dbPassword && dbHost && dbOptions
		? `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}${dbOptions}${dbAppName}`
		: null;

const config = {
	port: process.env.PORT || 3000,
	mongoUri: process.env.MONGO_URI || mongoUri,
	jwtSecret: process.env.JWT_SECRET,
};

export default config;
