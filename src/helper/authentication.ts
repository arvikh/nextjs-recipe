import { userModel } from "@/models/user.model";

export async function authenticateJWT(req: Request) {
  return new Promise((resolve, reject) => {
    const token = req.headers.get("authorization");
    const isUser = userModel.find((user) => user.key == token);
    if (isUser) {
      resolve(isUser);
    } else {
      reject("not authorized");
    }
  });
}
