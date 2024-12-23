import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { professionsQuery } from '../../postgresQuery/professionQuery.js';

export const searchProfessionService = async (client, query) => {
  try {
    const results = await client.query(professionsQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
    ]);

    // Форматування результатів
    const formattedResults = results.rows.map((row) => ({
      id: row.id,
      code_kp: row.code_kp,
      name: row.name,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search professions', error);
    logError(error, null, 'Failed to search professions');
    throw new Error('Failed to search professions');
  }
};
