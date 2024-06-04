const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name, role: foundUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({ msg: "User logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentials" });
  }
};

const dashboard = async (req, res) => {
  console.log('Accessing dashboard:', req.user);
  if (!req.user) {
    return res.status(403).json({ msg: 'Unauthorized access' });
  }
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  console.log('Fetching all users:', req.user);
  if (!req.user) {
    return res.status(403).json({ msg: 'Unauthorized access' });
  }
  let users = await User.find({});
  return res.status(200).json({ users });
};

const addUser = async (req, res) => {
  const { name, phone, role, email, password } = req.body;

  if (!name || !phone || !role || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const newUser = new User({ name, phone, role, email, password });
    await newUser.save();
    res.status(201).json({ msg: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding employee', error });
  }
};

const updateUser = async (req, res) => {
  console.log('Updating user:', req.user, req.params.id);
  if (!req.user) {
    return res.status(403).json({ msg: 'Unauthorized access' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  console.log('Deleting user:', req.user, req.params.id);
  if (!req.user) {
    return res.status(403).json({ msg: 'Unauthorized access' });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting user', error });
  }
};

module.exports = {
  login,
  dashboard,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
};
