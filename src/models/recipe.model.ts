import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true },
  ingredients: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
});

export const recipeModel =
  mongoose.models.recipes ?? mongoose.model("recipes", recipeSchema);
