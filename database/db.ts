import pg from "npm:pg";
import { config } from "npm:dotenv";

import Logger from "../utils/logger.ts";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = config();

const client = new pg.Client({
  user: DB_USER,
  database: DB_NAME,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
});

export const connectDb = async () => {
  try {
    await client.connect();
    Logger.info("Connected to the database successfully.");
  } catch (error) {
    Logger.error(`Error connecting to the database: ${error}`);
    throw error;
  }
};

export const disconnectDb = async () => {
  try {
    await client.end();
    Logger.info("Disconnected from the database.");
  } catch (error) {
    Logger.error(`Error disconnecting from the database: ${error}`);
    throw error;
  }
};

export default client;
