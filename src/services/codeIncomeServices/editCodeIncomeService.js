import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { codeIncomeQuery } from '../../postgresQuery/codeIncomeQuery.js';

export const editCodeIncomeService = async (client, codeIncomeData) => {
  try {
    // Виконання запиту
    const result = await client.query(codeIncomeQuery.updateQuery, [
      codeIncomeData.id,
      codeIncomeData.code,
      codeIncomeData.name,
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
      date: result.rows[0].date,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    };
  } catch (error) {
    console.error('Failed to edit code income', error);
    logError(error, null, 'Failed to edit code income');
    throw new Error('Failed to edit code income');
  }
};
