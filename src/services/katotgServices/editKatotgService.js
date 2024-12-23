import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { katotgQuery } from '../../postgresQuery/katotgQuery.js';

export const editKatotgService = async (client, katotgData) => {
  try {
    // Виконання запиту
    const result = await client.query(katotgQuery.updateQuery, [
      katotgData.id,
      katotgData.katotg,
      katotgData.dps_name,
      katotgData.adress,
      katotgData.dps_code,
    ]);

    // Перевірка, чи запис було знайдено для оновлення
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення оновленого ітема
    return {
      id: result.rows[0].id,
      katotg: result.rows[0].katotg,
      dps_name: result.rows[0].dps_name,
      adress: result.rows[0].adress,
      dps_code: result.rows[0].dps_code,
    };
  } catch (error) {
    console.error('Failed to edit katotg', error);
    logError(error, null, 'Failed to edit katotg');
    throw new Error('Failed to edit katotg');
  }
};
