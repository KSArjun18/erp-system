const express = require('express');
const router = express.Router();
const { addPayroll, getPayrolls } = require('../controllers/payroll');
const { authenticationMiddleware, verifyAdmin } = require('../middleware/auth');

router.route('/').post(authenticationMiddleware, verifyAdmin, addPayroll).get(authenticationMiddleware,  getPayrolls);

module.exports = router;
