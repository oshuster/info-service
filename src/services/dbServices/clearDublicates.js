import { migrationLogger } from '../../config/logConfig.js';
import { logError } from '../../config/logError.js';
import 'dotenv/config';

export const clearDuplicates = async (client, { clear, count }) => {
  try {
    await client.query('BEGIN');

    migrationLogger.info(`STARTING DUPLICATE CLEARING`);

    const countDuplicatesResult = await client.query(count);
    const totalDuplicates = countDuplicatesResult.rows[0].total_duplicates;

    migrationLogger.info(`Found duplicates: ${totalDuplicates}`);

    if (parseInt(totalDuplicates, 10) > 0) {
      await client.query(clear);
      migrationLogger.info(`Duplicates cleared successfully`);
    } else {
      migrationLogger.info(`No duplicates found`);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to clear duplicates', error);
    migrationLogger.error('Failed to clear duplicates', error);
    logError(error, null, 'Failed to clear duplicates');
    throw new Error('Failed to clear duplicates');
  }
};
