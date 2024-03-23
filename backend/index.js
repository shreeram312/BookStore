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

    const existingUser = await Book.findOne({ title, author });
    if (existingUser) {
      return res.json({
        msg: "Book Already Exists",
      });
    }

    const BookUser = await Book.create({
      title,
      author,
      publishYear,
    });

    // console.log(BookUser);
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
    count: books.length,
    msg: books,
  });
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = await Book.findById(id);
    // console.log(bookId);
    res.json({
      bookId,
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(403).json({
        msg: "Send proper inputs",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    console.log(result);

    if (!result) {
      return res.json({
        msg: "No Book Found",
      });
    }
    res.json({
      msg: "Book Updated Succesfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.json({
        msg: "No Book Available",
      });
    }
    res.json({
      msg: "Book Deleted Succesfully",
    });
  } catch (err) {
    console.log(err);
  }
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
