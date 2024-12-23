import { searchKatotgService } from '../../services/katotgServices/searchKatotgService.js';

export const searchKatotgController = async (req, res) => {
  try {
    const result = await searchKatotgService(req.db, req.query.q);

    res.json(result);
  } catch (error) {
    console.error('Error in katotgController:', error);
    res.status(500).json({ error: 'Failed to search katotg' });
  }
};
