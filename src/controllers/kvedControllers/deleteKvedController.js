import { logError } from '../../config/logError.js';
import { deleteKvedService } from '../../services/kvedServices/deleteKvedService.js';

export const deleteKvedController = async (req, res) => {
  try {
    const result = await deleteKvedService(req.client, req.query.id);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Profession with ID ${req.query.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in deleteProfController:', error);
    logError(error, req, 'Error in deleteProfController');
    res
      .status(500)
      .json({ error: 'Failed to delete in classifier of professions' });
  }
};
