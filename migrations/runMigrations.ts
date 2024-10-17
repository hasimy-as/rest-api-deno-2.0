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

const runMigrations = async () => {
  try {
    await client.connect();

    const migrationsDir = "./migrations";
    const migrationFiles: string[] = [];

    for await (const file of Deno.readDir(migrationsDir)) {
      if (file.isFile && file.name.endsWith(".sql")) {
        migrationFiles.push(file.name);
      }
    }

    migrationFiles.sort();

    for (const migrationFile of migrationFiles) {
      const migrationSQL = await Deno.readTextFile(`${migrationsDir}/${migrationFile}`);
      Logger.log(`Running migration: ${migrationFile}`);
      await client.query(migrationSQL);
    }

    Logger.log("All migrations completed successfully!");
  } catch (error) {
    Logger.error(`Error running migrations: ${error}`);
  } finally {
    await client.end();
  }
};

await runMigrations();
