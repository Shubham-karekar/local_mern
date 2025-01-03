const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/auth-controller");
const signupStructure = require("../router/auth-router");
const validate = require("../middleware/validate-middleware");
const middleWare = require("../middleware/auth-middleware")
const contactForm = require("../controller/contact-controller");

router.route("/contact").post(contactForm);
// Define routes
router.route("/").get(authcontroller.home);
router.route("/register").post(authcontroller.register);
router.route("/login").post(authcontroller.login);
router.route("/user").get(middleWare , authcontroller.user);

module.exports = router;
