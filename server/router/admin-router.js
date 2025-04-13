const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller");  // ✅ Keep only this import
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware"); 


router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById )
router.route("/user/:id").get(authMiddleware, adminMiddleware, adminController.getUserByID)
router.route("/user/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserByID)


router.route("/contact").get(authMiddleware, adminMiddleware, adminController.getAllUsersContact);
router.route("/contact/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById )

module.exports = router;
