import { searchKvedService } from '../../services/kvedServices/searchKvedService.js';

export const searchKvedController = async (req, res) => {
  try {
    const result = await searchKvedService(req.client, req.query.q);

    res.json(result);
  } catch (error) {
    console.error('Error in typeController:', error);
    res.status(500).json({ error: 'Failed to search type' });
  }
};
