const { z } = require(Zod);

// Creating object structure for validation perpose

signupStructure = z.object({
  username: z
    .string({ require: "Name should be required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 charcters" })
    .max(20, { message: "Username should not be more than 20 charcters" }),
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ require: "Phone should be required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 charcters" })
    .max(20, { message: "Phone should not be more than 10 charcters" }),
  password: z
    .string({ require: "password should be required" })
    .trim()
    .min(3, { message: "password must be atleast 3 charcters" })
    .max(20, { message: "password should not be more than 20 charcters" }),
});

module.exports = signupStructure;
