import fs from 'fs';
import xlsx from 'xlsx';
import HttpError from '../../helpers/HttpError.js';
import { migrationLogger, serviceLogger } from '../../config/logConfig.js';
import { logError } from '../../config/logError.js';

export const parseAndInsertXlsx = async (client, file, options) => {
  try {
    const { tableName, schemaName, insertQuery, processRow } = options;

    serviceLogger.debug(`Start parsing the file: ${file.originalname}`);

    // Перевірка наявності файлу
    if (!file) {
      serviceLogger.error('File not transferred');
      throw HttpError(400, 'No file provided');
    }

    const filePath = file.path; // Шлях до тимчасового файлу, створеного multer
    serviceLogger.debug(`Path to temporary file: ${filePath}`);

    // Відкриття та парсинг файлу
    serviceLogger.debug('Reading an XLS file...');
    const workFile = xlsx.readFile(filePath);

    const sheetNames = workFile.SheetNames;
    serviceLogger.debug(`Sheet Names: ${sheetNames}`);

    const worksheet = workFile.Sheets[sheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    serviceLogger.debug(`Number of rows: ${rows.length}`);

    if (!rows.length) {
      serviceLogger.warn(
        'The XLS or XLSX file is empty or incorrectly formatted'
      );
      throw HttpError(400, 'XLS or XLSX file is empty or improperly formatted');
    }

    migrationLogger.info(
      `Parsed ${rows.length} rows from the XLS file (table: ${tableName})`
    );

    // Процес вставки рядків у базу даних
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      migrationLogger.debug(`Row ${index}: ${JSON.stringify(row)}`);

      try {
        const processedData = processRow(row, index);
        if (!processedData) {
          migrationLogger.warn(`Skipping row ${index} due to missing data`);
          continue;
        }

        await client.query(insertQuery, processedData);
        migrationLogger.debug(`Row ${index} inserted successfully.`);
      } catch (insertError) {
        serviceLogger.error(
          `Error inserting row ${index}: ${insertError.message}`
        );
      }
    }

    migrationLogger.info(`Migration for table '${tableName}' completed`);

    // Видалення тимчасового файлу
    fs.unlinkSync(filePath);
    serviceLogger.debug(`Temporary file deleted: ${filePath}`);
  } catch (error) {
    serviceLogger.error('Error parsing and inserting data:', error);
    logError(error, null, 'Failed to parse XLS and insert data');
    throw HttpError(
      500,
      `Failed to parse XLS and insert data: ${error.message}`
    );
  }
};
