import pkg from "pg";
import "dotenv/config";
const { Client } = pkg;
import HttpError from "../../helpers/HttpError.js";
import { serviceLogger } from "../../config/logConfig.js";
import { logError } from "../../config/logError.js";
import { tableName } from "../../common/tablesName.js";

const SCHEMA_NAME = process.env.SCHEMA_NAME || "info-service";

export const initializeDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT || 5432,
  });
  try {
    await client.connect();
    serviceLogger.info(
      `Connected to PostgreSQL database: ${process.env.DB_HOST}:${process.env.DB_PORT}\nDB name: ${process.env.DB_DATABASE}`
    );

    // CREATE SCHEMA IF NOT EXISTS
    const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME};`;
    serviceLogger.debug("Executing query: ", createSchemaQuery);
    await client.query(createSchemaQuery);
    serviceLogger.info(`Schema created successfully: ${SCHEMA_NAME}`);

    // CREATING TABLES
    // довідник професій
    const createProfessionsTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.professions} (
        id SERIAL PRIMARY KEY,
        code_kp TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `;
    serviceLogger.debug("Executing query: ", createProfessionsTableQuery);
    await client.query(createProfessionsTableQuery);
    serviceLogger.info(
      `Database table for ${tableName.professions} in schema ${SCHEMA_NAME} created successfully`
    );

    return client;
  } catch (error) {
    logError(error, null, "Failed to initialize the PostgreSQL database");
    console.error("Error details: ", error);
    throw HttpError(500, "Failed to initialize the PostgreSQL database");
  }
};
