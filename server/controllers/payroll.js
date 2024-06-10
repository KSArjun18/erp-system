const Payroll = require('../models/Payroll');

const addPayroll = async (req, res) => {
  const { userId, month, salary, status } = req.body;

  try {
    const newPayroll = new Payroll({ userId, month, salary, status });
    await newPayroll.save();
    res.status(201).json({ msg: 'Payroll added successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding payroll', error });
  }
};

const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find({}).populate('userId', 'name');
    res.status(200).json({ payrolls });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching payrolls', error });
  }
};

module.exports = {
  addPayroll,
  getPayrolls,
};
