import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.get("/", (req, res) => {
  res.json({
    msg: "Hi ",
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
