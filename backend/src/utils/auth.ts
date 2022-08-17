import { sign, Secret } from "jsonwebtoken";
import { User } from "../entities/User";

export const createToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: "1h",
  });