import 'dotenv/config';
import { tableName } from '../common/tablesName.js';
const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

const createCategoryInsuredTableQuery = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${tableName.categoryInsured} (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code NUMERIC NOT NULL,
    name VARCHAR(300) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;

const createQuery = `
      INSERT INTO ${SCHEMA_NAME}.${tableName.categoryInsured} (code, name, description)
      VALUES ($1, $2, $3)
      RETURNING id, code, name, description, created_at, updated_at
    `;

// const deleteQuery = `
//       DELETE FROM ${SCHEMA_NAME}.${tableName.codeIncome}
//       WHERE id = $1
//       RETURNING id, code, name, date, created_at, updated_at
//     `;

// const updateQuery = `
//       UPDATE ${SCHEMA_NAME}.${tableName.codeIncome}
//       SET code = $2, name = $3
//       WHERE id = $1
//       RETURNING id, code, name, date, created_at, updated_at
//     `;

// const searchQuery = `
//       SELECT id, code, name, date, created_at, updated_at
//       FROM ${SCHEMA_NAME}.${tableName.codeIncome}
//       WHERE code::text ILIKE $1
//       OR name ILIKE $2
//     `;

export const categoryInsuredQuery = {
  createCategoryInsuredTableQuery,
  // deleteQuery,
  // updateQuery,
  // searchQuery,
  createQuery,
};
