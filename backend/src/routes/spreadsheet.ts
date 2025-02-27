import express from 'express';
import { Spreadsheet } from '../models/Spreadsheet';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const { cells } = req.body;
    const spreadsheet = await Spreadsheet.create({ cells });
    res.json(spreadsheet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save spreadsheet' });
  }
});

export default router; 