import express from 'express';
import { Spreadsheet } from '../models/Spreadsheet';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const { cells, title } = req.body;
    const spreadsheet = await Spreadsheet.create({ 
      cells,
      title: title || 'Untitled Spreadsheet'
    });
    res.json(spreadsheet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save spreadsheet' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const spreadsheets = await Spreadsheet.find().sort({ createdAt: -1 });
    res.json(spreadsheets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spreadsheets' });
  }
});

export default router; 