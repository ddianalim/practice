import mongoose from 'mongoose';

const SpreadsheetSchema = new mongoose.Schema({
  name: String,
  cells: {
    type: Map,
    of: {
      value: String,
      formula: String,
      isComputing: Boolean,
      error: String,
    }
  },
  lastModified: { type: Date, default: Date.now },
});

export const Spreadsheet = mongoose.model('Spreadsheet', SpreadsheetSchema); 