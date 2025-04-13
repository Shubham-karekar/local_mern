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

// Register Route
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

// User Login route


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

// user route
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

//  save address
const saveAddress = async (req, res) => {
  try {
    const { email, address } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user's address
    user.address = address;
    await user.save();

    res.status(200).json({ msg: "Address saved successfully", address: user.address });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


const getAddress = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.address) return res.status(200).json({ address: null });

    res.status(200).json({ address: user.address });
  } catch (err) {
    console.error("Get address error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


// for ForgotPassword password

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a reset token (simplified)
    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    await user.save();

    // Send email (configure SMTP settings)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Use this token to reset password: ${resetToken}`,
    });
    res.json({ message: "Reset email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAddress , home, register, login, user, forgotPassword, saveAddress };
