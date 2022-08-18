import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities/User";
dotenv.config();

export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return next(
      res.status(400).json({
        status: "error",
        msg: "Please login :V",
      })
    );
  }

  try {
    const decoData = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as any;

    const user = await User.findOneBy({ id: Number(decoData.userId) });

    if (!user) {
      return next(
        res.status(400).json({
          status: "error",
          msg: "Not user",
        })
      );
    } else {

      //@ts-ignore 
      req.user = user

      next();
    }
  } catch (error) {
    console.log(error);
  }
};
