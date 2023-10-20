import express from "express";
import { PhotoModel } from "../models/Photos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await PhotoModel.find({});
  res.json({ data, message: "ok" });
});

export { router as PhotoRouter };
