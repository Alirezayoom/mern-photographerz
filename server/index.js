import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/photographerz");
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connect to db"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
