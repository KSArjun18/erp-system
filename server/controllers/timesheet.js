const TimeSheet = require('../models/TimeSheet');

const addTimeSheet = async (req, res) => {
  const { userId, date, hoursWorked, activity } = req.body;

  try {
    const newTimeSheet = new TimeSheet({ userId, date, hoursWorked, activity });
    await newTimeSheet.save();
    res.status(201).json({ msg: 'Timesheet added successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding timesheet', error });
  }
};

const getTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheet.find({})
    .populate('userId', 'name role') 
    res.status(200).json({ timeSheets });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching timesheets', error });
  }
};


module.exports = {
  addTimeSheet,
  getTimeSheets
};
