import HttpError from '../helpers/HttpError.js';

export const checkJsonFile = (req, res, next) => {
  try {
    // Перевірка, чи файл взагалі був переданий
    if (!req.file) {
      throw HttpError(400, 'Missing file');
    }

    // Отримання MIME-типу та розширення
    const mimeType = req.file.mimetype;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    // Перевірка на допустимі MIME-типи та розширення
    const validMimeTypes = ['application/json'];
    const validExtensions = ['json'];

    if (
      !validMimeTypes.includes(mimeType) ||
      !validExtensions.includes(fileExtension)
    ) {
      throw HttpError(400, 'The file is not in JSON format (.json)');
    }

    next();
  } catch (error) {
    next(error);
  }
};
