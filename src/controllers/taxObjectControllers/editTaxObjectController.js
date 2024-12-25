import { logError } from '../../config/logError.js';
import { editTaxObjectService } from '../../services/taxObjectServices/editTaxObjectService.js';

export const editTaxObjectController = async (req, res) => {
  try {
    const result = await editTaxObjectService(req.client, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Tax object with ID ${req.body.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in editTaxObjectController:', error);
    logError(error, req, 'Error in editTaxObjectController');
    res.status(500).json({ error: 'Failed to edit taxObject' });
  }
};
