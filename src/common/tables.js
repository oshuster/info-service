import { categoryInsuredQuery } from '../postgresQuery/categoryInsuredQuery.js';
import { codeIncomeQuery } from '../postgresQuery/codeIncomeQuery.js';
import { katotgQuery } from '../postgresQuery/katotgQuery.js';
import { kvedQuery } from '../postgresQuery/kvedQuery.js';
import { professionsQuery } from '../postgresQuery/professionQuery.js';
import { taxObjectsQuery } from '../postgresQuery/taxObjectsQuery.js';
import { tableName } from './tablesName.js';

export const tables = [
  {
    name: tableName.professions,
    createQuery: professionsQuery.createProfessionsTableQuery,
  },
  {
    name: tableName.taxObjects,
    createQuery: taxObjectsQuery.createTaxObjectsTableQuery,
  },
  {
    name: tableName.katotg,
    createQuery: katotgQuery.createKatotgTableQuery,
  },
  {
    name: tableName.kved,
    createQuery: kvedQuery.createKvedTableQuery,
  },
  {
    name: tableName.codeIncome,
    createQuery: codeIncomeQuery.createCodeIncomeTableQuery,
  },
  {
    name: tableName.categoryInsured,
    createQuery: categoryInsuredQuery.createCategoryInsuredTableQuery,
  },
];
