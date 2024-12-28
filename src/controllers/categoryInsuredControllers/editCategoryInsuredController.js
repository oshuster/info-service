import { logError } from '../../config/logError.js';
import { editCategoryInsuredService } from '../../services/categoryInsuredServices/editCategoryInsuredService.js';

export const editCategoryInsuredController = async (req, res) => {
  try {
    const result = await editCategoryInsuredService(req.client, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Category insured with ID ${req.body.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in editCategoryInsuredController:', error);
    logError(error, req, 'Error in editCategoryInsuredController');
    res.status(500).json({ error: 'Failed to edit category insured' });
  }
};
