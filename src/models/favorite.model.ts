import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  recipeId: { type: mongoose.Schema.ObjectId, ref: "recipes", required: true },
});

export const favoriteModel =
  mongoose.models.favorites ?? mongoose.model("favorites", favoriteSchema);
