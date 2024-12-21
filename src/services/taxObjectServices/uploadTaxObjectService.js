import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { clearDuplicates } from '../dbServices/clearDublicates.js';
import { parseAndInsertXlsx } from '../fileParserServices/xlsProfessionsParser.js';
import { tableName } from '../../common/tablesName.js';
import { cleanField } from '../../helpers/cleanField.js';
import { migrationLogger } from '../../config/logConfig.js';
import { taxObjectsQuery } from '../../postgresQuery/taxObjectsQuery.js';

export const uploadTaxObjectService = async (client, file) => {
  try {
    const queries = {
      count: taxObjectsQuery.countDuplicatesQuery,
      clear: taxObjectsQuery.clearQuery,
    };

    const options = {
      tableName: tableName.taxObjects,
      insertQuery: taxObjectsQuery.insertQuery,
      processRow: (row, index) => {
        const rowType = cleanField(row['TYPE']);
        const rowName = cleanField(row['NAME_OBJ']);

        if (!rowType || !rowName) {
          migrationLogger.warn(
            `Skipping row ${index + 1} due to missing data: TYPE or NAME`
          );
          return null;
        }

        return [rowType, rowName];
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
