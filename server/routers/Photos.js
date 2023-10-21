import express from "express";
import { PhotoModel } from "../models/Photos.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const page = +req.query.page - 1 || 0;
  const pageSize = 24;

  const { photo } = await req.body;

  const allPhotos = await PhotoModel.find({})
    .skip(page * pageSize)
    .limit(pageSize);

  const foundPhotos = await PhotoModel.find({
    name: { $regex: photo, $options: "i" },
  });
  const photos = await PhotoModel.find({
    name: { $regex: photo, $options: "i" },
  })
    .skip(page * pageSize)
    .limit(pageSize);

  if (photo === "") {
    return res.json({
      data: allPhotos,
      meta: {
        page: Number(page) + 1,
        pageCount: Math.ceil(foundPhotos.length / pageSize),
      },
    });
  }

  if (!photo) {
    return console.log("not found");
  }

  res.json({
    data: photos,
    meta: {
      page: Number(page) + 1,
      pageCount: Math.ceil(foundPhotos.length / pageSize),
    },
  });
});

export { router as PhotoRouter };
