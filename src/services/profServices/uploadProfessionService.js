import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { clearDuplicates } from '../dbServices/clearDublicates.js';
import { professionsQuery } from '../../postgresQuery/professionQuery.js';
import { parseAndInsertXlsx } from '../fileParserServices/parseXlsx.js';
import { tableName } from '../../common/tablesName.js';
import { migrationLogger } from '../../config/logConfig.js';

export const uploadProfessionService = async (client, file) => {
  try {
    const queries = {
      count: professionsQuery.countDuplicatesQuery,
      clear: professionsQuery.clearQuery,
    };

    const options = {
      tableName: tableName.professions,
      insertQuery: professionsQuery.insertQuery,
      processRow: (row, index) => {
        const codeKp = row['КОД КП'];
        const name = row['ПРОФЕСІЙНА НАЗВА РОБОТИ'];

        if (!codeKp || !name) {
          migrationLogger.warn(
            `Skipping row ${index + 1} due to missing data: CODE KP or NAME`
          );
          return null;
        }

        return [codeKp, name];
      },
    };
    await parseAndInsertXlsx(client, file, options);
    await clearDuplicates(client, queries);
  } catch (error) {
    console.error('Error parsing file in profController', error);
    logError(error, null, 'Error parsing file in profController');
    throw new Error('Error parsing file in profController');
  }
};
