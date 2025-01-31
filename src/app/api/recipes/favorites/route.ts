import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { userModel } from "@/models/user.model";
import { NextRequest } from "next/server";
import { Recipe } from "@/types/request-body";
import { recipeModel } from "@/models/recipe.model";
//Add fav recipe
export async function POST(request: NextRequest) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const body = await request.json();
    const { recipeId } = body;

    const getUser = await userModel.findOne({
      _id: userId,
      favorites: recipeId,
    });

    if (getUser === null) {
      const user = await userModel.findOne({
        _id: userId,
      });
      user.favorites.push(recipeId);
      await user.save();
      return Response.json({
        message: "Recipe added to favorite list",
        success: true,
      });
    }

    getUser.favorites.remove(recipeId);
    await getUser.save();
    return Response.json({
      message: "Recipe removed from favorite list",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const user = await userModel.findOne({ _id: userId });
    const favoritesList: string[] = user.favorites;

    const resultFavList: Recipe[] = await Promise.all(
      favoritesList.map(async (eachId) => {
        const recipeObj = await recipeModel.findOne({ _id: eachId });
        return recipeObj; // Return the recipe object for each ID
      })
    );

    return Response.json({ data: resultFavList, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
