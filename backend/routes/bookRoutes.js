import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/addBook", async (req, res) => {
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

router.get("/getBooks", async (req, res) => {
  const books = await Book.find();
  res.json({
    count: books.length,
    msg: books,
  });
});

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;
