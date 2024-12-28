import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { codeIncomeQuery } from '../../postgresQuery/codeIncomeQuery.js';

export const createCodeIncomeService = async (client, codeIncomeData) => {
  try {
    // Виконання запиту
    const result = await client.query(codeIncomeQuery.createQuery, [
      codeIncomeData.code,
      codeIncomeData.name,
    ]);

    // Повернення створеного ітема
    return {
      id: result.rows[0].id,
      code: result.rows[0].code,
      name: result.rows[0].name,
      date: result.rows[0].date,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    };
  } catch (error) {
    console.error('Failed to create code income', error);
    logError(error, null, 'Failed to create code income');
    throw new Error('Failed to create code income');
  }
};
