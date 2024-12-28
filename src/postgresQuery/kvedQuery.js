import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createKvedTableQuery = `
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.kved} (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        info VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

const insertQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.kved} (code, name, description, info)
      VALUES ($1, $2, $3, $4)
    `;

const createQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.kved} (code, name, description, info)
      VALUES ($1, $2, $3, $4)
      RETURNING id, code, name, description, info
    `;

const deleteQuery = `
      DELETE FROM ${SCHEMA_NAME}.${tableName.kved}
      WHERE id = $1
      RETURNING id, code, name, description, info
    `;

const updateQuery = `
      UPDATE ${SCHEMA_NAME}.${tableName.kved}
      SET code = $1, name = $2, description = $3, info = $4
      WHERE id = $5
      RETURNING id, code, name, description, info
    `;

const searchQuery = `
      SELECT id, code, name, description, info
      FROM ${SCHEMA_NAME}.${tableName.kved}
      WHERE code ILIKE $1
      OR name ILIKE $2
      OR description ILIKE $3
      OR info ILIKE $4
    `;

export const kvedQuery = {
  createKvedTableQuery,
  insertQuery,
  createQuery,
  deleteQuery,
  updateQuery,
  searchQuery,
};
