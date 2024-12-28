import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { categoryInsuredQuery } from '../../postgresQuery/categoryInsuredQuery.js';

export const editCategoryInsuredService = async (client, data) => {
  try {
    // Виконання запиту
    const result = await client.query(categoryInsuredQuery.updateQuery, [
      data.id,
      data.code,
      data.name,
      data.description,
    ]);

    // Перевірка, чи запис було знайдено для оновлення
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення оновленого ітема
    return {
      id: result.rows[0].id,
      code: result.rows[0].code,
      name: result.rows[0].name,
      description: result.rows[0].description,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    };
  } catch (error) {
    console.error('Failed to edit code insured', error);
    logError(error, null, 'Failed to edit code insured');
    throw new Error('Failed to edit code insured');
  }
};
