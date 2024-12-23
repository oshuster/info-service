import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createProfessionsTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.professions} (
        id SERIAL PRIMARY KEY,
        code_kp TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

const countDuplicatesQuery = `
      SELECT SUM(count) - COUNT(*) AS total_duplicates
      FROM (
          SELECT code_kp, name, COUNT(*) AS count
          FROM ${SCHEMA_NAME}.${tableName.professions}
          GROUP BY code_kp, name
          HAVING COUNT(*) > 1
      ) sub;
    `;

const clearQuery = `
          WITH duplicates AS (
            SELECT
              id,
              code_kp,
              name,
              ROW_NUMBER() OVER (
                PARTITION BY code_kp, name
                ORDER BY id ASC
              ) as rn
            FROM ${SCHEMA_NAME}.${tableName.professions}
          )
          DELETE FROM ${SCHEMA_NAME}.${tableName.professions}
          WHERE id IN (
            SELECT id
            FROM duplicates
            WHERE rn > 1
          );
        `;

const insertQuery = `
    INSERT INTO ${SCHEMA_NAME}.${tableName.professions} (code_kp, name)
    VALUES ($1, $2)
  `;

const searchQuery = `
      SELECT id, code_kp, name
      FROM ${SCHEMA_NAME}.${tableName.professions}
      WHERE code_kp ILIKE $1
      OR name ILIKE $2
    `;

const updateQuery = `
      UPDATE ${SCHEMA_NAME}.${tableName.professions}
      SET code_kp = $1, name = $2
      WHERE id = $3
      RETURNING id, code_kp, name
    `;

const deleteQuery = `
      DELETE FROM ${SCHEMA_NAME}.${tableName.professions}
      WHERE id = $1
      RETURNING id, code_kp, name
    `;

const createQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.professions} (code_kp, name)
      VALUES ($1, $2)
      RETURNING id, code_kp, name
    `;

export const professionsQuery = {
  createProfessionsTableQuery,
  countDuplicatesQuery,
  clearQuery,
  insertQuery,
  searchQuery,
  updateQuery,
  deleteQuery,
  createQuery,
};
