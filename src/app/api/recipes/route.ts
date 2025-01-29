import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { recipeModel } from "@/models/recipe.model";
import { recipeValidationType } from "@/types/request-body";
import { NextRequest } from "next/server";

// CREATE RECIPE

export async function POST(request: NextRequest) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });
    const body = await request.json();
    console.log(body);
    const parsedRecipe = await recipeValidationType.safeParse(body);
    if (!parsedRecipe.success) {
      return Response.json({ error: parsedRecipe.error, success: false });
    }
    const { title, instructions, ingredients, imageUrl } = parsedRecipe.data;

    const newRecipe = await recipeModel.create({
      title,
      instructions,
      ingredients,
      imageUrl,

      userId: userId,
    });
    await newRecipe.save();
    return Response.json({
      newRecipe,
      message: "Recipe added successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}

// GET ALL RECIPES

export async function GET(request: Request) {
  try {
    const source = await request.headers.get("request");
    if (source == "mobile") {
      await authenticateJWT(request);
    }
    const result = await recipeModel.find({});
    return Response.json({ data: result, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
