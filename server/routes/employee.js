const express = require('express');
const router = express.Router();
const { getEmployee } = require('../controllers/employeeController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, getEmployee);

module.exports = router;
