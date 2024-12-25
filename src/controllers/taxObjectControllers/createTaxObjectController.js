import { logError } from '../../config/logError.js';
import { createTaxObjectService } from '../../services/taxObjectServices/createTaxObjectService.js';

export const createTaxObjectController = async (req, res) => {
  try {
    const result = await createTaxObjectService(req.client, req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in taxObject controller:', error);
    logError(error, req, 'Error in taxObject controller');
    res.status(500).json({ error: 'Failed to create taxObject' });
  }
};
