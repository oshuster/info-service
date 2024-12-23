import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { professionsQuery } from '../../postgresQuery/professionQuery.js';

export const createProfessionService = async (client, professionData) => {
  try {
    // Виконання запиту
    const result = await client.query(professionsQuery.createQuery, [
      professionData.code_kp,
      professionData.name,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      code_kp: result.rows[0].code_kp,
      name: result.rows[0].name,
    };
  } catch (error) {
    console.error('Failed to create profession', error);
    logError(error, null, 'Failed to create profession');
    throw new Error('Failed to create profession');
  }
};
