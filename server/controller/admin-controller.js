const User = require("../models/user-module");
const Contact = require("../models/contact-module");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, {password: 0});
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(users); // Fixed "contacts" to "users"
  } catch (error) {
    next(error);
  }
};

const getAllUsersContact = async (req, res, next) => { // Fixed function name
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) { // Fixed "contacts === 0" to "contacts.length === 0"
      return res.status(404).json({ message: "Data not found" }); // Fixed "Data is Not found" to "Data not found"
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllUsersContact }; // Fixed export statement
