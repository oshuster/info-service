import { kvedQuery } from '../../postgresQuery/kvedQuery.js';

export const searchKvedService = async (client, query) => {
  try {
    const results = await client.query(kvedQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
    ]);

    // [{code, name, description, info}]
    const formattedResults = results.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      info: row.info,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search kved', error);
    throw new Error('Failed to search kved');
  }
};
