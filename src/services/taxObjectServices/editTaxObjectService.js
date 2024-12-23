import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { taxObjectsQuery } from '../../postgresQuery/taxObjectsQuery.js';

export const editTaxObjectService = async (client, TaxObjectData) => {
  try {
    // Виконання запиту
    const result = await client.query(taxObjectsQuery.updateQuery, [
      TaxObjectData.type,
      TaxObjectData.name,
      TaxObjectData.id,
    ]);

    // Перевірка, чи запис було знайдено для оновлення
    if (result.rowCount === 0) {
      return null;
    }

    // Повернення оновленого ітема
    return {
      id: result.rows[0].id,
      type: result.rows[0].type,
      name: result.rows[0].name,
    };
  } catch (error) {
    console.error('Failed to edit taxObjects', error);
    logError(error, null, 'Failed to edit taxObjects');
    throw new Error('Failed to edit taxObjects');
  }
};
