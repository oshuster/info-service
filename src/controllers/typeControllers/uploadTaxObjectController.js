import { logError } from '../../config/logError.js';
import { uploadTaxObjectService } from '../../services/taxObjectServices/uploadTaxObjectService.js';

export const uploadTaxObjectController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не надано' });
    }

    uploadTaxObjectService(req.client, req.file);

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
