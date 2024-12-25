import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { taxObjectsQuery } from '../../postgresQuery/taxObjectsQuery.js';

export const createTaxObjectService = async (client, TaxObjectData) => {
  try {
    // Виконання запиту
    const result = await client.query(taxObjectsQuery.createQuery, [
      TaxObjectData.type,
      TaxObjectData.name,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      type: result.rows[0].type,
      name: result.rows[0].name,
    };
  } catch (error) {
    console.error('Failed to create taxObject', error);
    logError(error, null, 'Failed to create taxObject');
    throw new Error('Failed to create taxObject');
  }
};
