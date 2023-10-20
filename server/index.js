import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routers/Users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/users", UserRouter);

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connect to db"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
