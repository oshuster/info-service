import { logError } from '../../config/logError.js';
import { editCodeIncomeService } from '../../services/codeIncomeServices/editCodeIncomeService.js';

export const editCodeIncomeController = async (req, res) => {
  try {
    const result = await editCodeIncomeService(req.client, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Code income with ID ${req.body.id} not found` });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in editCodeIncomeController:', error);
    logError(error, req, 'Error in editCodeIncomeController');
    res.status(500).json({ error: 'Failed to edit code income' });
  }
};
