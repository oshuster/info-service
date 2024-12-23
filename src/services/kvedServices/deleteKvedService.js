import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { kvedQuery } from '../../postgresQuery/kvedQuery.js';

export const deleteKvedService = async (client, id) => {
  try {
    // Виконання запиту
    const result = await client.query(kvedQuery.deleteQuery, [id]);

    // Перевірка, чи було знайдено і видалено запис
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення даних видаленого ітема
    return result.rows[0];
  } catch (error) {
    console.error('Failed to delete profession', error);
    logError(error, null, 'Failed to delete profession');
    throw new Error('Failed to delete profession');
  }
};
