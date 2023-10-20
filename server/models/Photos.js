import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  avatar: { type: String },
  photo: { type: String },
});

export const PhotoModel = mongoose.model("photos", PhotoSchema);
