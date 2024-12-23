import { logError } from '../../config/logError.js';
import { uploadKvedService } from '../../services/kvedServices/uploadKvedService.js';

export const uploadKvedController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не надано' });
    }

    uploadKvedService(req.client, req.file);

    res.json({
      message:
        'File uploaded successfully. Data will be updated within 1-15 minutes.',
    });
  } catch (error) {
    console.error('Error loading file in profController:', error);
    logError(error, req, 'Error loading file in profController');
    res.status(500).json({ error: 'Error loading file in profController' });
  }
};
