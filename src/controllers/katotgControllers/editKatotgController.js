import { logError } from '../../config/logError.js';
import { editKatotgService } from '../../services/katotgServices/editKatotgService.js';
import { editProfessionService } from '../../services/profServices/editProfessionService.js';

export const editKatotgController = async (req, res) => {
  try {
    const result = await editKatotgService(req.client, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Profession with ID ${req.body.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in KatotgController:', error);
    logError(error, req, 'Error in KatotgController');
    res.status(500).json({ error: 'Failed to create Katotg' });
  }
};
