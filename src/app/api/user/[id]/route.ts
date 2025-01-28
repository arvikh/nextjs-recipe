import { authenticateJWT } from "@/helper/common-auth";
import { userModel } from "@/models/user.model";
import { recipeModel } from "@/models/recipe.model";
import { favoriteModel } from "@/models/favorite.model";

//gets all recipes related to specific user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authenticateJWT(request);
    const id = (await params).id;
    const user = await userModel.findOne({ _id: id });
    console.log(user);
    if (user) {
      const recipes = await recipeModel.find({ userId: id });
      const favorites = await favoriteModel.find({ userId: id });
      return Response.json({
        recipes: recipes,
        favorites: favorites && favorites,
        success: true,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
