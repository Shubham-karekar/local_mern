const Contact = require("../models/contact-module");

// const contactPage = async (req, res) => {
//   try{
//     // res.status(200).send("Hello, this is the Contact route");

//     const response = req.body;
//     await Contact.create(response);
//     return res.status(200).json({ message: "Message send sucessfully" });
//   }catch(error) {
//     console.log(error);
    
//     return res.status(500).json({ message: "Message not send" });
//   }
// };

// module.exports = contactPage;



const contactPage = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Validate fields
    if (!username || !email || !message) {
      console.log("Validation failed:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to database
    const contact = await Contact.create({ username, email, message });
    console.log("Data saved:", contact);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error in contactPage:", error.message, error);
    return res.status(500).json({ message: "Message not sent" });
  }
};

module.exports = contactPage;
