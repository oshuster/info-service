import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createTaxObjectsTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.taxObjects} (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `;

const countDuplicatesQuery = `
      SELECT SUM(count) - COUNT(*) AS total_duplicates
      FROM (
          SELECT type, name, COUNT(*) AS count
          FROM ${SCHEMA_NAME}.${tableName.taxObjects}
          GROUP BY type, name
          HAVING COUNT(*) > 1
      ) sub;
    `;

const clearQuery = `
          WITH duplicates AS (
            SELECT
              id,
              type,
              name,
              ROW_NUMBER() OVER (
                PARTITION BY type, name
                ORDER BY id ASC
              ) as rn
            FROM ${SCHEMA_NAME}.${tableName.taxObjects}
          )
          DELETE FROM ${SCHEMA_NAME}.${tableName.taxObjects}
          WHERE id IN (
            SELECT id
            FROM duplicates
            WHERE rn > 1
          );
        `;

const insertQuery = `
    INSERT INTO ${SCHEMA_NAME}.${tableName.taxObjects} (type, name)
    VALUES ($1, $2)
  `;

const searchQuery = `
      SELECT id, type, name
      FROM ${SCHEMA_NAME}.${tableName.taxObjects}
      WHERE type ILIKE $1
      OR name ILIKE $2
    `;

const updateQuery = `
      UPDATE ${SCHEMA_NAME}.${tableName.taxObjects}
      SET type = $1, name = $2
      WHERE id = $3
      RETURNING id, type, name
    `;

const deleteQuery = `
      DELETE FROM ${SCHEMA_NAME}.${tableName.taxObjects}
      WHERE id = $1
      RETURNING id, type, name
    `;

const createQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.taxObjects} (type, name)
      VALUES ($1, $2)
      RETURNING id, type, name
    `;

export const taxObjectsQuery = {
  createTaxObjectsTableQuery,
  countDuplicatesQuery,
  clearQuery,
  insertQuery,
  searchQuery,
  updateQuery,
  deleteQuery,
  createQuery,
};
