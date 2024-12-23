import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { katotgQuery } from '../../postgresQuery/katotgQuery.js';

export const deleteKatotgService = async (client, id) => {
  try {
    // Виконання запиту
    const result = await client.query(katotgQuery.deleteQuery, [id]);

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
