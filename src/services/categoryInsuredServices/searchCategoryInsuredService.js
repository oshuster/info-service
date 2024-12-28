import { categoryInsuredQuery } from '../../postgresQuery/categoryInsuredQuery.js';

export const searchCategoryInsuredService = async (client, query) => {
  try {
    const results = await client.query(categoryInsuredQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
    ]);

    const formattedResults = results.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search category insured', error);
    throw new Error('Failed to search category insured');
  }
};
