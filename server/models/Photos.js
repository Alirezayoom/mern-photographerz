import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.String,
    refs: "users",
    required: true,
  },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  publishedAt: Date,
});

export const PhotoModel = mongoose.model("photos", PhotoSchema);
