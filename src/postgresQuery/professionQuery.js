import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

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
    INSERT INTO ${SCHEMA_NAME}.professions (code_kp, name)
    VALUES ($1, $2)
  `;

export const professionsQuery = {
  countDuplicatesQuery,
  clearQuery,
  insertQuery,
};
