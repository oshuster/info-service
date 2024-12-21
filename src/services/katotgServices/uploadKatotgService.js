import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { clearDuplicates } from '../dbServices/clearDublicates.js';
import { parseAndInsertXlsx } from '../fileParserServices/xlsProfessionsParser.js';
import { tableName } from '../../common/tablesName.js';
import { cleanField } from '../../helpers/cleanField.js';
import { migrationLogger } from '../../config/logConfig.js';
import { katotgQuery } from '../../postgresQuery/katotgQuery.js';

export const uploadKatotgService = async (client, file) => {
  try {
    const queries = {
      count: katotgQuery.countDuplicatesQuery,
      clear: katotgQuery.clearQuery,
    };

    const options = {
      tableName: tableName.katotg,
      insertQuery: katotgQuery.insertQuery,
      processRow: (row, index) => {
        const rowKatotg = cleanField(row['KATOTG']);
        const rowDpsName = cleanField(row['DPS NAME']);
        const rowAdress = cleanField(row['ADRESS']);
        let rowDpsCode = cleanField(row['DPS CODE']);

        // Обрізаємо значення до коми щоб на фронті не правити
        if (rowDpsCode !== undefined && rowDpsCode !== null) {
          rowDpsCode = String(rowDpsCode).split(/[.,]/)[0].trim();
        } else {
          rowDpsCode = ''; // Якщо значення відсутнє
        }

        if (!rowKatotg || !rowDpsName || !rowAdress || !rowDpsCode) {
          migrationLogger.warn(`Skipping row ${index + 1} due to missing data`);
          return null;
        }

        return [rowKatotg, rowDpsName, rowAdress, rowDpsCode];
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
