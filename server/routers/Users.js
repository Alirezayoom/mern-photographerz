import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await UserModel.find({});
  res.json({ data, message: "ok" });
});

export { router as UserRouter };
