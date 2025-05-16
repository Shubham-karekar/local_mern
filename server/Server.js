require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
  origin: [
    "https://electronics-ecom.netlify.app", // Deployed frontend
    "http://localhost:5173", // Local development
  ],
  methods: ["GET", "POST", "DELETE", "HEAD", "PUT", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // Express middleware for app
app.use("/", authRoute);
app.use("/contact", authRoute); // Assuming contact routes are handled by auth-router
app.use("/admin", adminRoute);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
