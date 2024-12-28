import { logError } from '../../config/logError.js';
import { createCodeIncomeService } from '../../services/codeIncomeServices/createCodeIncomeService.js';

export const createCodeIncomeController = async (req, res) => {
  try {
    const result = await createCodeIncomeService(req.client, req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createCodeIncomeController:', error);
    logError(error, req, 'Error in createCodeIncomeController');
    res.status(500).json({ error: 'Failed to create code income' });
  }
};
