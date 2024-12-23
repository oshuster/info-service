import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { kvedQuery } from '../../postgresQuery/kvedQuery.js';

export const editKvedService = async (client, kvedtData) => {
  try {
    // Виконання запиту
    const result = await client.query(kvedQuery.updateQuery, [
      kvedtData.code,
      kvedtData.name,
      kvedtData.description,
      kvedtData.info,
      kvedtData.id,
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
      info: result.rows[0].info,
    };
  } catch (error) {
    console.error('Failed to edit taxObjects', error);
    logError(error, null, 'Failed to edit taxObjects');
    throw new Error('Failed to edit taxObjects');
  }
};
