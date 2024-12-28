import { codeIncomeQuery } from '../../postgresQuery/codeIncomeQuery.js';

export const searchCategoryInsuredService = async (client, query) => {
  try {
    const results = await client.query(codeIncomeQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
    ]);

    const formattedResults = results.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      date: row.date,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search code income', error);
    throw new Error('Failed to search code income');
  }
};
