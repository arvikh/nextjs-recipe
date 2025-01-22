import { authenticateJWT } from "@/helper/common-auth";
import { recipeModel } from "@/models/recipe.model";
import { recipeValidationType } from "@/types/request-body";
import { NextRequest } from "next/server";

// CREATE RECIPE

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticateJWT(request);
    const body = await request.json();
    const parsedRecipe = await recipeValidationType.safeParse(body);
    if (!parsedRecipe.success) {
      return Response.json({ error: parsedRecipe.error, success: false });
    }
    console.log(userId);
    const newRecipe = await recipeModel.create({
      title: parsedRecipe.data.title,
      instructions: parsedRecipe.data.instructions,
      ingredients: parsedRecipe.data.ingredients,
      imageUrl: parsedRecipe.data.imageUrl,
      userId: userId.userId,
    });
    newRecipe.save();
  } catch (err) {
    return Response.json({ error: err, success: false });
  }
}
// GET RECIPE BY ID
// GET ALL RECIPES
// DELETE RECIPE
