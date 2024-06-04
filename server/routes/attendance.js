const express = require('express');
const router = express.Router();
const { addAttendance, getAttendance } = require('../controllers/attendance');
const { authenticationMiddleware, verifyAdmin } = require('../middleware/auth');

router.route('/').post(authenticationMiddleware, addAttendance).get(authenticationMiddleware,  getAttendance);

module.exports = router;
