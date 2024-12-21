import { searchTypes } from '../../services/taxObjectServices/searchTypes.js';

export const searchTaxObjectController = async (req, res) => {
  try {
    const result = await searchTypes(req.db, req.query.q);

    res.json(result);
  } catch (error) {
    console.error('Error in typeController:', error);
    res.status(500).json({ error: 'Failed to search type' });
  }
};
