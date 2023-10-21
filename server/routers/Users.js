import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const page = +req.query.page - 1 || 0;
  const pageSize = 16;

  const { photographer } = await req.body;
  const allPhotographers = await UserModel.find({})
    .skip(page * pageSize)
    .limit(pageSize);

  const foundPhotographers = await UserModel.find({
    firstName: { $regex: photographer, $options: "i" },
  });
  const photographers = await UserModel.find({
    firstName: { $regex: photographer, $options: "i" },
  })
    .skip(page * pageSize)
    .limit(pageSize);

  if (photographer === "") {
    return res.json({
      data: allPhotographers,
      meta: {
        page: Number(page) + 1,
        pageCount: Math.ceil(foundPhotographers.length / pageSize),
      },
    });
  }

  if (!photographer) {
    return console.log("not found");
  }

  res.json({
    data: photographers,
    meta: {
      page: Number(page) + 1,
      pageCount: Math.ceil(foundPhotographers.length / pageSize),
    },
  });
});

export { router as UserRouter };
