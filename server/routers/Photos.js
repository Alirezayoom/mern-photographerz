import express from "express";
import { PhotoModel } from "../models/Photos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page - 1 || 0;
    const pageSize = 15;
    const { photo } = req.query;

    const query = photo ? { name: { $regex: photo, $options: "i" } } : {};

    const totalCount = await PhotoModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const photos = await PhotoModel.find(query)
      .skip(page * pageSize)
      .limit(pageSize);

    res.json({
      data: photos,
      meta: {
        page: page + 1,
        pageCount: totalPages,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as PhotoRouter };
