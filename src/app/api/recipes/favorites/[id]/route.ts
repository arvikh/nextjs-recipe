import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { userModel } from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const favoriteId = (await params).id;
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const user = await userModel.findOne({ _id: userId });
    const favoritesList: string[] = user.favorites;

    const inFavList = favoritesList.find((item) => item.equals(favoriteId));

    if (inFavList) {
      return Response.json({ inFavList: inFavList, success: true });
    }
    return Response.json({ inFavList: inFavList, success: false });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
