import { logError } from '../../config/logError.js';
import { deleteCodeIncomeService } from '../../services/codeIncomeServices/deleteCodeIncomeService.js';

export const deleteCodeIncomeController = async (req, res) => {
  try {
    const result = await deleteCodeIncomeService(req.client, req.query.id);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Code income with ID ${req.query.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in deleteCodeIncomeController:', error);
    logError(error, req, 'Error in deleteCodeIncomeController');
    res.status(500).json({ error: 'Failed to delete code income' });
  }
};
