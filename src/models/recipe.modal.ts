import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Instructions: { type: String, required: true },
  Ingredients: { type: String, required: true },
  ImageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
});

export const userModel = mongoose.model("recipe", recipeSchema);
