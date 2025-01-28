import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { favoriteModel } from "@/models/favorite.model";
import { recipeModel } from "@/models/recipe.model";
import { NextRequest } from "next/server";

//Add fav recipe
export async function POST(request: NextRequest) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const body = await request.json();
    const { recipeId } = body;
    console.log(recipeId);
    const foundRecipe = await recipeModel.findById({ _id: recipeId });
    const checkFavorites = await favoriteModel.find({
      recipeId: recipeId,
      userId: userId,
    });
    if (checkFavorites) {
      return Response.json({
        message: "Recipe already exist in favorite list",
      });
    }
    if (foundRecipe) {
      const newFavoriteRecipe = await favoriteModel.create({
        userId: userId,
        recipeId: recipeId,
      });
      await newFavoriteRecipe.save();
      return Response.json({
        newFavoriteRecipe,
        message: "Recipe added to favorite list",
        success: true,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}

//Delete fav recipe
export async function DELETE(request: NextRequest) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const body = await request.json();
    const { recipeId } = body;
    const deleteFavRecipe = await favoriteModel.findOneAndDelete({
      recipeId: recipeId,
      userId,
    });
    if (!deleteFavRecipe) {
      return Response.json({
        message: "recipe does not exist in your favorite list",
        success: false,
      });
    }
    return Response.json({
      data: deleteFavRecipe,
      message: "Favorite recipe deleted successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
