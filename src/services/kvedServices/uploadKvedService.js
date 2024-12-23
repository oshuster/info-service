import { logError } from '../../config/logError.js';
import 'dotenv/config';
import { migrationLogger, serviceLogger } from '../../config/logConfig.js';
import HttpError from '../../helpers/HttpError.js';
import { tableName } from '../../common/tablesName.js';
import fs from 'node:fs/promises';
import { kvedQuery } from '../../postgresQuery/kvedQuery.js';

export const uploadKvedService = async (client, file) => {
  const filePath = file?.path;

  try {
    serviceLogger.debug(`Start parsing the file: ${file.originalname}`);

    // Перевірка наявності файлу
    if (!file) {
      serviceLogger.error('File not transferred');
      throw HttpError(400, 'No file provided');
    }

    serviceLogger.debug(`Path to temporary file: ${filePath}`);

    // Читання JSON-файлу
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const jsonData = JSON.parse(data);

    serviceLogger.debug(`File content: ${JSON.stringify(jsonData, null, 2)}`);

    // Перевірка наявності ключа `kved` і даних
    if (!jsonData.kved || jsonData.kved.length === 0) {
      throw HttpError(500, 'Missing or empty "kved" data in the file');
    }

    // Вставка кожного запису з масиву `kved`
    for (let index = 0; index < jsonData.kved.length; index++) {
      const { Code, Name, Description, Info } = jsonData.kved[index];

      // Перевірка наявності необхідних даних
      if (!Code || !Name || !Description || !Info) {
        migrationLogger.warn(
          `Skipping row ${index + 1} due to missing data: ${JSON.stringify(
            jsonData.kved[index]
          )}`
        );
        continue;
      }

      try {
        // Виконання запиту до бази даних
        await client.query(kvedQuery.insertQuery, [
          Code,
          Name,
          Description,
          Info,
        ]);
        migrationLogger.info(
          `Row ${index + 1} inserted: Code=${Code}, Name=${Name}`
        );
      } catch (error) {
        serviceLogger.error(`Error inserting row ${index + 1}:`, error);
      }
    }

    migrationLogger.info(`Migration for table '${tableName.kved}' completed`);
  } catch (error) {
    serviceLogger.error('Error parsing and inserting data:', error);
    logError(error, null, 'Failed to parse JSON and insert data');
    throw HttpError(
      500,
      `Failed to parse JSON and insert data: ${error.message}`
    );
  } finally {
    // Видалення тимчасового файлу
    if (filePath) {
      try {
        await fs.unlink(filePath);
        serviceLogger.debug(`Temporary file deleted: ${filePath}`);
      } catch (deleteError) {
        serviceLogger.error(
          `Failed to delete temporary file: ${deleteError.message}`
        );
      }
    }
  }
};
