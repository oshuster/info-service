import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { codeIncomeQuery } from '../../postgresQuery/codeIncomeQuery.js';

export const deleteCodeIncomeService = async (client, id) => {
  try {
    // Виконання запиту
    const result = await client.query(codeIncomeQuery.deleteQuery, [id]);

    // Перевірка, чи було знайдено і видалено запис
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення даних видаленого ітема
    return result.rows[0];
  } catch (error) {
    console.error('Failed to delete code income', error);
    logError(error, null, 'Failed to delete code income');
    throw new Error('Failed to delete code income');
  }
};
