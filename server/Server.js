require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, HEAD, PUT, PATCH",
};
app.use(cors(corsOptions));

app.use(express.json()); // Express middleware for app


app.use("/", authRoute);

app.use("/contact", authRoute); // Assuming contact routes are handled by auth-router
// app.use("/login", authRoute); // Assuming contact routes are handled by auth-router
app.use("/admin", adminRoute);  
// app.use("/forgotpassword", authRoute);  

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
