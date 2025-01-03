const jwt = require("jsonwebtoken");
const User = require("../models/user-module");

const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ mes: "http token not provided" });
  }

  const jwtToken = token.replace("Bearer", " ").trim();
  console.log("token from auth moddleware", token);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECURITY_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    res.status(401).json({ Message: "unauthoried token , Invalid token" });
  }
};

module.exports = authmiddleware;
