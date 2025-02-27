import express, { Request, Response } from 'express';
import { Spreadsheet } from '../models/Spreadsheet';

const router = express.Router();

// List route
router.get('/list', async (req: Request, res: Response): Promise<void> => {
  try {
    const spreadsheets = await Spreadsheet.find().sort({ createdAt: -1 });
    res.json(spreadsheets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spreadsheets' });
  }
});

// Create new spreadsheet
router.post('/save', async (req: Request, res: Response): Promise<void> => {
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

// Update existing spreadsheet
router.put('/update/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cells, title } = req.body;
    const spreadsheet = await Spreadsheet.findByIdAndUpdate(
      req.params.id,
      { 
        cells, 
        title: title || 'Untitled Spreadsheet',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!spreadsheet) {
      res.status(404).json({ error: 'Spreadsheet not found' });
      return;
    }
    res.json(spreadsheet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update spreadsheet' });
  }
});

// Delete existing spreadsheet
router.delete('/delete/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const spreadsheet = await Spreadsheet.findByIdAndDelete(req.params.id);
    
    if (!spreadsheet) {
      res.status(404).json({ error: 'Spreadsheet not found' });
      return;
    }
    res.json({ message: 'Spreadsheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete spreadsheet' });
  }
});

export default router; 