import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function authenticateJWT(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const token = req.headers.get("authorization")?.split(" ")[1] || "";
    const isUser = jwt.verify(token, process.env.SECRET?.toString() || "");
    console.log(isUser);
    if (isUser) {
      resolve(isUser);
    } else {
      reject("User is not authorized");
    }
  });
}
