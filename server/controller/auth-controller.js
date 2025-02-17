const bcrypt = require("bcryptjs");
const User = require("../models/user-module");

// Home Route
const home = async (req, res) => {
  try {
    res.status(200).send("Hello, this is the home route");
  } catch (error) {
    console.error("Home Route Error:", error);
    res.status(500).send("Internal server error");
  }
};



const register = async (req, res) => {
  try {
    console.log("New User data");
    console.log(req.body);

    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }

    

    const userdata = await User.create({
      username,
      email,
      phone,
      password,
      //:hashpassword
    });
    res.status(200).send({
      msg: "Registeration Done Sucessfully",
      token: await userdata.generateToken(),
      userID: userdata._id.toString(),
    });
  } catch (error) {
    console.error(error); // Log the full error stack for debugging
    res.status(500).json({ msg: "Internal server error" });
  }
};
// User Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userID: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    next(error); // Pass error to middleware for centralized handling
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user; // Assuming `req.user` contains the user data from middleware
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User data retrieved:", userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { home, register, login, user };
