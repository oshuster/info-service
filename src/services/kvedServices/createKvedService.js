import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { kvedQuery } from '../../postgresQuery/kvedQuery.js';

export const createKvedService = async (client, kvedData) => {
  try {
    // Виконання запиту
    const result = await client.query(kvedQuery.createQuery, [
      kvedData.code,
      kvedData.name,
      kvedData.description,
      kvedData.info,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      code: result.rows[0].code,
      name: result.rows[0].name,
      description: result.rows[0].description,
      info: result.rows[0].info,
    };
  } catch (error) {
    console.error('Failed to create kved', error);
    logError(error, null, 'Failed to create kved');
    throw new Error('Failed to create kved');
  }
};
