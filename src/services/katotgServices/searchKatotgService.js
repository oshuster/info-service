import { katotgQuery } from '../../postgresQuery/katotgQuery';

export const searchKatotgService = async (client, query) => {
  try {
    const results = await client.query(katotgQuery.searchQuery, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
    ]);

    // [{id:id, katotg:katotg, dps_name:dps_name, adress:adress, dps_code:dps_code}]
    const formattedResults = results.map((row) => ({
      id: row.id,
      katotg: row.katotg,
      dps_name: row.dps_name,
      adress: row.adress,
      dps_code: row.dps_code,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Failed to search katotg', error);
    throw new Error('Failed to search katotg');
  }
};
