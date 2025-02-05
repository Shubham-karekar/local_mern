const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller"); // Destructure the imported functions
const authMiddleware = require("../middleware/auth-middleware")

router.route("/contactadmin").get(authMiddleware, adminController.getAllUsersContact);
router.route('/users').get(authMiddleware, adminController.getAllUsers);

module.exports = router;
