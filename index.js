const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config({ path: "./config.env" });
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

//connect to db
mongoose
  .connect(process.env.MONGO_URL_local)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  //routes
  app.use(express.json());
  app.use("/api/admin", adminRoutes);
  app.use("/api/student", studentRoutes);

dotenv.config();

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
