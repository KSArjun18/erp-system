const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  logIn: { type: String, required: true },
  logOut: { type: String, required: true },
  leavesTaken: { type: Number, default: 0 }, // Number of leaves taken
  leavesRemaining: { type: Number, default: 0 }, // Number of leaves remaining
  emergencyLeave: { type: Boolean, default: false }, // Whether it's an emergency leave
});

module.exports = mongoose.model('Attendance', AttendanceSchema);