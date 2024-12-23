import { taxObjectsQuery } from '../../postgresQuery/taxObjectsQuery';

export const searchTypeObjectService = async (client, query) => {
  try {
    const results = await client.query(taxObjectsQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
    ]);

    // [{id: id, type: type, name: name}]
    const formattedResults = results.map((row) => ({
      id: row.id,
      type: row.type,
      name: row.name,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search taxObjects', error);
    throw new Error('Failed to search taxObjects');
  }
};
