import { authenticateJWT } from "@/helper/common-auth";
import { recipeModel } from "@/models/recipe.model";
import { recipeValidationType } from "@/types/request-body";

// CREATE RECIPE

export async function POST(request: Request) {
  try {
    const { id } = (await authenticateJWT(request)) as { id: string };
    const body = await request.json();
    const parsedRecipe = await recipeValidationType.safeParse(body);
    if (!parsedRecipe.success) {
      return Response.json({ error: parsedRecipe.error, success: false });
    }
    const { title, instructions, ingredients, imageUrl } = parsedRecipe.data;
    console.log(id);
    const newRecipe = await recipeModel.create({
      title,
      instructions,
      ingredients,
      imageUrl,
      userId: id,
    });
    await newRecipe.save();
    return Response.json({ newRecipe, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}

// GET ALL RECIPES

export async function GET(request: Request) {
  try {
    await authenticateJWT(request);
    const result = await recipeModel.find({});
    return Response.json({ data: result, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
