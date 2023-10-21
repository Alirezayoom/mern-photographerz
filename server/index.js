import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routers/Users.js";
import { PhotoRouter } from "./routers/Photos.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/users", UserRouter);
app.use("/api/photos", PhotoRouter);

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connect to db"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
