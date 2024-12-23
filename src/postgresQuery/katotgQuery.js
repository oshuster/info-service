import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createKatotgTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.katotg} (
        id SERIAL PRIMARY KEY,
        katotg TEXT NOT NULL,
        dps_name TEXT NOT NULL,
        adress TEXT NOT NULL,
        dps_code TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

const countDuplicatesQuery = `
      SELECT SUM(count) - COUNT(*) AS total_duplicates
      FROM (
          SELECT katotg, dps_name, adress, dps_code, COUNT(*) AS count
          FROM ${SCHEMA_NAME}.${tableName.katotg}
          GROUP BY katotg, dps_name, adress, dps_code
          HAVING COUNT(*) > 1
      ) sub;
    `;

const clearQuery = `
          WITH duplicates AS (
            SELECT
              id,
              katotg,
              dps_name,
              adress,
              dps_code,
              ROW_NUMBER() OVER (
                PARTITION BY katotg, dps_name, adress, dps_code
                ORDER BY id ASC
              ) as rn
            FROM ${SCHEMA_NAME}.${tableName.katotg}
          )
          DELETE FROM ${SCHEMA_NAME}.${tableName.katotg}
          WHERE id IN (
            SELECT id
            FROM duplicates
            WHERE rn > 1
          );
        `;

const createQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.katotg} (katotg, dps_name, adress, dps_code)
      VALUES ($1, $2, $3, $4)
      RETURNING id, katotg, dps_name, adress, dps_code
    `;

const deleteQuery = `
      DELETE FROM ${SCHEMA_NAME}.${tableName.katotg}
      WHERE id = $1
      RETURNING id, katotg, dps_name, adress, dps_code
    `;

const updateQuery = `
      UPDATE ${SCHEMA_NAME}.${tableName.katotg}
      SET katotg = $2, dps_name = $3, adress = $4, dps_code = $5
      WHERE id = $1
      RETURNING id, katotg, dps_name, adress, dps_code
    `;

const searchQuery = `
      SELECT id, katotg, dps_name, adress, dps_code
      FROM ${SCHEMA_NAME}.${tableName.katotg}
      WHERE katotg ILIKE $1
      OR dps_name ILIKE $2
      OR adress ILIKE $3
      OR dps_code ILIKE $4
    `;

export const katotgQuery = {
  createKatotgTableQuery,
  countDuplicatesQuery,
  clearQuery,
  createQuery,
  deleteQuery,
  updateQuery,
  searchQuery,
};
