import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Hi Bro",
  });
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        msg: "No Proper Inputs",
      });
    }
    const BookUser = await Book.create({
      title,
      author,
      publishYear,
    });
    console.log(BookUser);
    res.json({
      BookUser,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getbooks", async (req, res) => {
  const books = await Book.find();
  res.json({
    msg: books,
  });
});

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
