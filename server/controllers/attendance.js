const Attendance = require('../models/Attendance');

const addAttendance = async (req, res) => {
  const { userId, date, checkIn, checkOut } = req.body;

  try {
    const newAttendance = new Attendance({ userId, date, checkIn, checkOut });
    await newAttendance.save();
    res.status(201).json({ msg: 'Attendance added successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding attendance', error });
  }
};

const getAttendance = async (req, res) => {
    try {
      const attendance = await Attendance.find({})
        .populate('userId', 'name')
        .select('-__v') // Exclude the __v field from the response
        .lean(); // Convert Mongoose documents to plain JavaScript objects
  
      // Calculate leaves taken and leaves remaining for each attendance record
      const attendanceWithLeavesInfo = attendance.map((record) => {
        // Example logic to calculate leaves taken and remaining (replace with your actual logic)
        const leavesTaken = Math.floor(Math.random() * 10); // Dummy calculation
        const leavesRemaining = 10 - leavesTaken; // Dummy calculation
  
        // Add the leaves information to the attendance record
        return {
          ...record,
          leavesTaken,
          leavesRemaining,
        };
      });
  
      res.status(200).json({ attendance: attendanceWithLeavesInfo });
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching attendance', error });
    }
  };
  

module.exports = {
  addAttendance,
  getAttendance,
};
