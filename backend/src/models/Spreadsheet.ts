import mongoose from 'mongoose';

const CellSchema = new mongoose.Schema({
  value: String,
  formula: String,
  isComputing: Boolean,
  error: String
});

const SpreadsheetSchema = new mongoose.Schema({
  cells: {
    type: Map,
    of: CellSchema
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Spreadsheet = mongoose.model('Spreadsheet', SpreadsheetSchema); 