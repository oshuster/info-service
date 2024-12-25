import { logError } from '../../config/logError.js';
import { deleteTaxObjectService } from '../../services/taxObjectServices/deleteTaxObjectService.js';

export const deleteTaxObjectController = async (req, res) => {
  try {
    const result = await deleteTaxObjectService(req.client, req.query.id);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Tax object with ID ${req.query.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in deleteTaxObjectController:', error);
    logError(error, req, 'Error in deleteTaxObjectController');
    res.status(500).json({ error: 'Failed to delete tax object' });
  }
};
