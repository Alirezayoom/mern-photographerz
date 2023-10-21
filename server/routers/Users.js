import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = +req.query.page - 1 || 0;
  const pageSize = 16;

  const data = await UserModel.find()
    .skip(page * pageSize)
    .limit(pageSize);
  res.json({
    data,
    meta: {
      page: Number(page) + 1,
      pageCount: Math.ceil((await UserModel.countDocuments()) / pageSize),
    },
  });
});

export { router as UserRouter };
