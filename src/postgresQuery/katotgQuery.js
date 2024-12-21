import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createKatotgTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.katotg} (
        id SERIAL PRIMARY KEY,
        katotg TEXT NOT NULL,
        dps_name TEXT NOT NULL,
        adress TEXT NOT NULL,
        dps_code TEXT NOT NULL
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

const insertQuery = `
    INSERT INTO ${SCHEMA_NAME}.${tableName.katotg} (katotg, dps_name, adress, dps_code)
    VALUES ($1, $2, $3, $4)
  `;

export const katotgQuery = {
  createKatotgTableQuery,
  countDuplicatesQuery,
  clearQuery,
  insertQuery,
};
