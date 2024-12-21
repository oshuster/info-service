import HttpError from '../helpers/HttpError.js';

export const checkExcelFile = (req, res, next) => {
  try {
    // Перевірка, чи файл взагалі був переданий
    if (!req.file) {
      throw HttpError(400, 'Файл не передано');
    }

    // Отримання MIME-типу та розширення
    const mimeType = req.file.mimetype;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    // Перевірка на допустимі MIME-типи та розширення
    const validMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];
    const validExtensions = ['xlsx', 'xls'];

    if (
      !validMimeTypes.includes(mimeType) ||
      !validExtensions.includes(fileExtension)
    ) {
      throw HttpError(400, 'The file is not in Excel format (.xls or .xlsx)');
    }

    next(); // Якщо перевірка пройдена, передаємо управління далі
  } catch (error) {
    next(error); // Передаємо помилку в обробник
  }
};
