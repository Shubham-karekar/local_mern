

const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const { contactPage,} = require("../controller/contact-controller");

// Define routes
router.get("/", authController.home);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/contact", contactPage);
router.get("/user", authMiddleware, authController.user);

module.exports = router;
