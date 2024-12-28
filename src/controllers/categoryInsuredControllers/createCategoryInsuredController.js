import { logError } from '../../config/logError.js';
import { createCategoryInsuredService } from '../../services/categoryInsuredServices/createCategoryInsuredService.js';

export const createCategoryInsuredController = async (req, res) => {
  try {
    const result = await createCategoryInsuredService(req.client, req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createCategoryInsuredController:', error);
    logError(error, req, 'Error in createCategoryInsuredController');
    res.status(500).json({ error: 'Failed to create category insured' });
  }
};
