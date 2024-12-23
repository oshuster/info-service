import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { katotgQuery } from '../../postgresQuery/katotgQuery.js';

export const createKatotgService = async (client, katotgData) => {
  try {
    // Виконання запиту
    const result = await client.query(katotgQuery.createQuery, [
      katotgData.katotg,
      katotgData.dps_name,
      katotgData.adress,
      katotgData.dps_code,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      katotg: result.rows[0].katotg,
      dps_name: result.rows[0].dps_name,
      adress: result.rows[0].adress,
      dps_code: result.rows[0].dps_code,
    };
  } catch (error) {
    console.error('Failed to create katotg', error);
    logError(error, null, 'Failed to create katotg');
    throw new Error('Failed to create katotg');
  }
};
