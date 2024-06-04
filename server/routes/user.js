const express = require("express");
const router = express.Router();

const { login, dashboard, getAllUsers, addUser, updateUser, deleteUser } = require("../controllers/user");
const { authenticationMiddleware, verifyAdmin } = require('../middleware/auth');

router.route("/login").post(login);

router.route("/admin_dashboard").get(authenticationMiddleware, dashboard);
router.route("/users").get(authenticationMiddleware, verifyAdmin, getAllUsers);
router.post('/add_employee', authenticationMiddleware, verifyAdmin, addUser);
router.put('/update_employee/:id', authenticationMiddleware, verifyAdmin, updateUser);
router.delete('/delete_employee/:id', authenticationMiddleware, verifyAdmin, deleteUser);


module.exports = router;
