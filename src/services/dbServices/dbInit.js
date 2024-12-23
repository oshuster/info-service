import pkg from 'pg';
import 'dotenv/config';
const { Client } = pkg;
import HttpError from '../../helpers/HttpError.js';
import { serviceLogger } from '../../config/logConfig.js';
import { logError } from '../../config/logError.js';
import { generateTriggerQuery } from './generateTriggerQuery.js';
import { tables } from '../../common/tables.js';

const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info-service';

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
    await client.query(createSchemaQuery);
    serviceLogger.info(`Schema created successfully: ${SCHEMA_NAME}`);

    // CREATE TABLES
    for (const table of tables) {
      serviceLogger.debug(`Executing query: ${table.createQuery}`);
      await client.query(table.createQuery);
      serviceLogger.info(
        `Database table for ${table.name} in schema ${SCHEMA_NAME} created successfully`
      );
    }

    // CREATE UPDATE_AT FUNCTION
    const createTriggerUpdatedAtQuery = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    await client.query(createTriggerUpdatedAtQuery);
    serviceLogger.info(`Main trigger function created successfully`);

    // CREATE TRIGGERS FOR EACH TABLE
    for (const table of tables) {
      const triggerQuery = generateTriggerQuery(table.name);
      serviceLogger.debug(`Executing query: ${triggerQuery}`);
      await client.query(triggerQuery);
      serviceLogger.info(
        `Trigger for ${table.name} in schema ${SCHEMA_NAME} created successfully`
      );
    }

    return client;
  } catch (error) {
    logError(error, null, 'Failed to initialize the PostgreSQL database');
    console.error('Error details: ', error);
    throw HttpError(500, 'Failed to initialize the PostgreSQL database');
  }
};
