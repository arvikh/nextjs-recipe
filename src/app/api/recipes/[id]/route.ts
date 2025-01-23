import { authenticateJWT } from "@/helper/common-auth";
import { recipeModel } from "@/models/recipe.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authenticateJWT(request);
    const id = (await params).id;
    const recipe = await recipeModel.findOne({ _id: id });
    return Response.json({ data: recipe, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authenticateJWT(request);
    const id = (await params).id;
    await recipeModel.findByIdAndDelete(id);
    const result = await recipeModel.find({});
    return Response.json({
      data: result,
      message: "Recipe deleted successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
