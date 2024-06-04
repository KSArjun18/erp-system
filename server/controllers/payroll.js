// Import the Payroll model from the models directory
const Payroll = require('../models/Payroll');

// Define an async function to add a new payroll record
const addPayroll = async (req, res) => {
  // Destructure the properties from the request body
  const { userId, month, salary, status } = req.body;

  try {
    // Create a new Payroll instance with the provided data
    const newPayroll = new Payroll({ userId, month, salary, status });

    // Save the new payroll record to the database
    await newPayroll.save();

    // Send a 201 status code indicating the resource was created successfully
    res.status(201).json({ msg: 'Payroll added successfully' });
  } catch (error) {
    // If an error occurs, send a 500 status code indicating a server error
    // Include the error message in the response for debugging purposes
    res.status(500).json({ msg: 'Error adding payroll', error });
  }
};

// Define an async function to get all payroll records
const getPayrolls = async (req, res) => {
  try {
    // Find all payroll records and populate the userId field with the user's name
    const payrolls = await Payroll.find({}).populate('userId', 'name');

    // Send a 200 status code indicating the request was successful
    // Include the payroll records in the response
    res.status(200).json({ payrolls });
  } catch (error) {
    // If an error occurs, send a 500 status code indicating a server error
    // Include the error message in the response for debugging purposes
    res.status(500).json({ msg: 'Error fetching payrolls', error });
  }
};

// Export the addPayroll and getPayrolls functions so they can be used in other parts of the application
module.exports = {
  addPayroll,
  getPayrolls,
};
