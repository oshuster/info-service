import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { professionsQuery } from '../../postgresQuery/professionQuery.js';

const SCHEMA_NAME = process.env.SCHEMA_NAME || 'info_service';

export const editProfessionService = async (client, professionData) => {
  try {
    // Виконання запиту
    const result = await client.query(professionsQuery.updateQuery, [
      professionData.code_kp,
      professionData.name,
      professionData.id,
    ]);

    // Перевірка, чи запис було знайдено для оновлення
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення оновленого ітема
    return {
      id: result.rows[0].id,
      code_kp: result.rows[0].code_kp,
      name: result.rows[0].name,
    };
  } catch (error) {
    console.error('Failed to edit profession', error);
    logError(error, null, 'Failed to edit profession');
    throw new Error('Failed to edit profession');
  }
};
