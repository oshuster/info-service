import { searchCategoryInsuredService } from '../../services/categoryInsuredServices/searchCategoryInsuredService.js';

export const searchCategoryInsuredController = async (req, res) => {
  try {
    const result = await searchCategoryInsuredService(req.client, req.query.q);

    res.json(result);
  } catch (error) {
    console.error('Error in searchCategoryInsuredController:', error);
    res.status(500).json({ error: 'Failed to search category insured' });
  }
};
