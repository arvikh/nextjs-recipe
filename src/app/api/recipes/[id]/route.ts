import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { recipeModel } from "@/models/recipe.model";
import { NextRequest } from "next/server";

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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });
    const recipeId = (await params).id;
    const deletedResult = await recipeModel.findOneAndDelete({
      _id: recipeId,
      userId,
    });
    console.log(deletedResult);
    if (!deletedResult) {
      return Response.json({
        message: "recipe does not exist in your bucket",
        success: false,
      });
    }
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
