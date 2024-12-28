import { logError } from '../../config/logError.js';
import { deleteCategoryInsuredService } from '../../services/categoryInsuredServices/deleteCategoryInsuredService.js';

export const deleteCategoryInsuredController = async (req, res) => {
  try {
    const result = await deleteCategoryInsuredService(req.client, req.query.id);

    if (!result) {
      return res.status(404).json({
        message: `Category insured with ID ${req.query.id} not found`,
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in deleteCategoryInsuredController:', error);
    logError(error, req, 'Error in deleteCategoryInsuredController');
    res.status(500).json({ error: 'Failed to delete category insured' });
  }
};
