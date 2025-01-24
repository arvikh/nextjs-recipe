import { userModel } from "@/models/user.model";
import { userInput, userValidationType } from "@/types/request-body";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectToDB from "@/dbConnect/dbConnect";
connectToDB();
export async function POST(request: NextRequest) {
  try {
    const parsedInput = await userValidationType.safeParse(request.body);
    if (!parsedInput.success) {
      return Response.json({ message: "Invalid input", success: false });
    }
    const { email, password }: userInput = parsedInput.data;
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "user name does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ message: "invalid username or password" });
    }
    const access_token = jwt.sign(
      { id: user._id },
      process.env.SECRET?.toString() || ""
    );
    const response = NextResponse.json({
      message: "user logged in successfully",
      success: true,
      token: access_token,
    });
    response.cookies.set("token", access_token, { httpOnly: true });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
