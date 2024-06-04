const mongoose = require('mongoose');

const TimeSheetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  activity: { type: String, required: true },
});

module.exports = mongoose.model('TimeSheet', TimeSheetSchema);
