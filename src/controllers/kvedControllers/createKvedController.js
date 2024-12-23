import { logError } from '../../config/logError.js';
import { createKvedService } from '../../services/kvedServices/createKvedService.js';

export const createKvedController = async (req, res) => {
  try {
    const result = await createKvedService(req.client, req.body);

    res.json(result);
  } catch (error) {
    console.error('Error in profController:', error);
    logError(error, req, 'Error in profController');
    res
      .status(500)
      .json({ error: 'Failed to create in classifier of professions' });
  }
};
