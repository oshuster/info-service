import { logError } from '../../config/logError.js';
import { createKvedService } from '../../services/kvedServices/createKvedService.js';

export const createKvedController = async (req, res) => {
  try {
    const result = await createKvedService(req.client, req.body);

    res.json(result);
  } catch (error) {
    console.error('Error in kved controller:', error);
    logError(error, req, 'Error in kved controller');
    res.status(500).json({ error: 'Failed to create in kved' });
  }
};
