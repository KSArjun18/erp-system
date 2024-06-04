// Import the Employee model from the models directory
const Employee = require('../models/Employee');

// Define an async function to get the employee details
const getEmployee = async (req, res) => {
  try {
    // Find the employee by their ID, which is stored in the request user object (populated by authentication middleware)
    // Exclude the password field from the result using .select('-password')
    const employee = await Employee.findById(req.user.id).select('-password');

    // If no employee is found with the given ID, return a 404 status with a message
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // If the employee is found, send the employee data as a JSON response
    res.json(employee);
  } catch (error) {
    // Log any errors to the console for debugging purposes
    console.error(error.message);

    // Send a 500 status indicating a server error
    res.status(500).send('Server Error');
  }
};

// Export the getEmployee function so it can be used in other parts of the application
module.exports = {
  getEmployee,
};
