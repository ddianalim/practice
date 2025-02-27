import mongoose from 'mongoose';

const CellSchema = new mongoose.Schema({
  value: String,
  formula: String,
  isComputing: Boolean,
  error: String
});

const SpreadsheetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Spreadsheet'
  },
  cells: {
    type: Map,
    of: CellSchema
  },
  metadata: {
    headers: [String],
    rowCount: Number,
    columnCount: Number
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