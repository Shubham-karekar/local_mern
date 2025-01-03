require(`dotenv`).config();

const express = require("express");
const app = express();
const cors = require('cors')
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/auth-router");

const connectDb = require("./utils/db");
const { Mongoose } = require("mongoose");
const errorMiddleware = require("./middleware/error-middleware");

const corsOption ={
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE,HEAD",
  credential: true,
}




app.use(cors(corsOption));
app.use(express.json()); //Express middleware

app.use("/", authRoute);

app.use("/contact", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is runing at port ${PORT}`);
  });
});
