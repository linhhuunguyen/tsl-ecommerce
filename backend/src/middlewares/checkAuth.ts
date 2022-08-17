import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities/User";
dotenv.config();

export const isAuthenticatedUser = async (
  req: Request<any>,
  _res: Response,
  next: NextFunction
) => {
  // const { token } = req.cookies;

  const authHeader = req.header("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];

  console.log("token", accessToken);

  if (!accessToken) {
    return next(console.log("Please Login :))))"));
  }

  try {
    const decoData = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    );

    console.log("decoData", decoData);

    const user = await User.findOneBy({ id: Number(decoData) });

    if (!user) {
      return next(console.log("khoong co user nhes :V"));
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
