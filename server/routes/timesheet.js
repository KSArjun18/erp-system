const express = require('express');
const router = express.Router();
const { addTimeSheet, getTimeSheets } = require('../controllers/timesheet');
const { authenticationMiddleware, verifyAdmin } = require('../middleware/auth');

router.route('/').post(authenticationMiddleware, addTimeSheet).get(authenticationMiddleware,  getTimeSheets);


module.exports = router;
