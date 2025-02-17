const User = require("../models/user-module");
const Contact = require("../models/contact-module");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    // const users = await User.find({}, { password: 0 }).lean();

    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(users); // Fixed "contacts" to "users"
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "User deleted form Database" });
  } catch (error) {
    res.status(400).json({ msg: "User not found in Database" });
    next(error);
    
  }
};

// const getUserByID = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const data = User.deleteOne({ _id: id }, { password: 0 });
//     res.status(200).json(data);
//   } catch (error) {
//     // res.status(400).json({ msg: "Contact not found in Database" });
//     next(error);
    
//   }
// };

const getUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    // ✅ Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // ✅ Log error in backend
    next(error); // ✅ Pass error to Express error handler
  }
};


// const updateContactByID = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatUserData = req.body;
//     const updatedData = await Contact.updateOne(
//       { _id: id },
//       { $set: updatUserData }
//     );
//     return res.status(200).json(updatedData)
//   } catch (error) {}
// };
const updateUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedData = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserData } // Returns updated document & ensures validation
    );

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", updatedData });
  } catch (error) {
    next(error); // Proper error handling
  }
};

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.findOne({ _id: id });
    res.status(200).json({ msg: "Contact deleted from Database" });
  } catch (error) {
    res.status(400).json({ msg: "Contact not found in Database" });
    next(error);
   
  }
};

const getAllUsersContact = async (req, res, next) => {
  // Fixed function name
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      // Fixed "contacts === 0" to "contacts.length === 0"
      return res.status(404).json({ message: "Data not found" }); // Fixed "Data is Not found" to "Data not found"
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    next(error);
  }
};

module.exports = {
  deleteUserById,
  getAllUsers,
  getUserByID,

  getAllUsersContact,
  deleteContactById,
  updateUserByID,
}; // Fixed export statement
