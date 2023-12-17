import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page - 1 || 0;
    const pageSize = 20;
    const { photographer } = req.query;

    const query = photographer
      ? { firstName: { $regex: photographer, $options: "i" } }
      : {};

    const totalCount = await UserModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const users = await UserModel.find(query)
      .skip(page * pageSize)
      .limit(pageSize);

    res.json({
      data: users,
      meta: {
        page: page + 1,
        pageCount: totalPages,
      },
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as UserRouter };
