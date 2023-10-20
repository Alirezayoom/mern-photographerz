import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const UserModel = mongoose.model("users", UserSchema);
