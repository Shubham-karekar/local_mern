const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userStructure = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userStructure.pre('save', async function (next) {
  //console.log("Pre method", this);
  //const user = this;
  const user = this;
  console.log("actual data ", this);


  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashpassword;
  } catch (error) {
    next(error);
  }
});


userStructure.methods.generateToken = async function () {
   try {
    return jwt.sign({
      userId: this.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECURITY_KEY,
    {
      expiresIn: "30d" 
    }
   )
   } catch (error) {
    console.error(error);
    
   }
}


const User = new mongoose.model("USER", userStructure);
module.exports = User;
