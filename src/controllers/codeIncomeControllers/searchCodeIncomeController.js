import { searchCodeIncomeService } from '../../services/codeIncomeServices/searchCodeIncomeService.js';

export const searchCodeIncomeController = async (req, res) => {
  try {
    const result = await searchCodeIncomeService(req.client, req.query.q);

    res.json(result);
  } catch (error) {
    console.error('Error in searchCodeIncomeController:', error);
    res.status(500).json({ error: 'Failed to search code income' });
  }
};
