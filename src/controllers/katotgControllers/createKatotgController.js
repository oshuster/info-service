import { logError } from '../../config/logError.js';
import { createKatotgService } from '../../services/katotgServices/createKatotgService.js';

export const createKatotgController = async (req, res) => {
  try {
    const result = await createKatotgService(req.client, req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in KatotgController:', error);
    logError(error, req, 'Error in KatotgController');
    res.status(500).json({ error: 'Failed to create Katotg' });
  }
};
