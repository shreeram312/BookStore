import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoutes.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Hi Bro",
  });
});

app.use("/books", bookRoute);

app.listen(PORT, function () {
  console.log(`Server is running on PORT ${PORT}`);
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("database error");
  });
