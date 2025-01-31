import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "recipes", default: false },
  ],
});

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
