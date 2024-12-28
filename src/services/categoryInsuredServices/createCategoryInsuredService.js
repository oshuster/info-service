import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { categoryInsuredQuery } from '../../postgresQuery/categoryInsuredQuery.js';

export const createCategoryInsuredService = async (client, data) => {
  try {
    // Виконання запиту
    const result = await client.query(categoryInsuredQuery.createQuery, [
      data.code,
      data.name,
      data.description,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      code: result.rows[0].code,
      name: result.rows[0].name,
      description: result.rows[0].description,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    };
  } catch (error) {
    console.error('Failed to create category insured', error);
    logError(error, null, 'Failed to create category insured');
    throw new Error('Failed to create category insured');
  }
};
