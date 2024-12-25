import { logError } from '../../config/logError.js';
import { deleteKatotgService } from '../../services/katotgServices/deleteKatotgService.js';
import { deleteProfessionService } from '../../services/profServices/deleteProfessionService.js';

export const deleteKatotgController = async (req, res) => {
  try {
    const result = await deleteKatotgService(req.client, req.query.id);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Katotg with ID ${req.query.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in deleteKatotgController:', error);
    logError(error, req, 'Error in deleteKatotgController');
    res.status(500).json({ error: 'Failed to delete Katotg' });
  }
};
