import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { categoryInsuredQuery } from '../../postgresQuery/categoryInsuredQuery.js';

export const deleteCategoryInsuredService = async (client, id) => {
  try {
    // Виконання запиту
    const result = await client.query(categoryInsuredQuery.deleteQuery, [id]);

    // Перевірка, чи було знайдено і видалено запис
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення даних видаленого ітема
    return result.rows[0];
  } catch (error) {
    console.error('Failed to delete category insured', error);
    logError(error, null, 'Failed to delete category insured');
    throw new Error('Failed to delete category insured');
  }
};
