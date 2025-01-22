import { userModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import { userValidationType } from "@/types/request-body";
import { NextRequest } from "next/server";
import connectToDB from "@/dbconnect/dbconnect";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const parsedInput = await userValidationType.safeParse(request.body);
    if (!parsedInput.success) {
      return Response.json({ message: "invalid input" });
    }
    const isUserExists = await userModel.findOne({
      email: parsedInput.data?.email,
    });
    if (isUserExists) {
      return Response.json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(parsedInput.data.password, 10);
    const newUser = await userModel.create({
      email: parsedInput.data.email,
      password: hashedPassword,
    });
    (await newUser).save();
    return Response.json({
      message: "user created successfully",
      success: true,
    });
  } catch (err) {
    return Response.json({ error: err, success: false });
  }
}
