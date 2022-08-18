import argon2d from "argon2";
import { Request, Response } from "express";
import { createToken } from "../utils/auth";
import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  const existingUser = await User.findOneBy({ username });

  if (existingUser) {
    res.status(400).json({
      status: "error",
      msg: "Duplicated username",
    });
  }

  const hashedPassword = await argon2d.hash(password);

  const user = User.create({ username, password: hashedPassword, role });

  await user.save();
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOneBy({ username });

  if (!existingUser) {
    res.status(400).json({
      status: "error",
      msg: "User not found",
    });
  } else {
    const isPasswordValid = await argon2d.verify(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      res.status(400).json({
        message: "Incorrect password",
      });
    }

    // sendRefreshToken(res, existingUser);

    res
      .cookie("Authorization", createToken("accessToken", existingUser), {
        httpOnly: true,
      })
      .cookie("refresh_token", createToken("refreshToken", existingUser), {
        httpOnly: true,
      });

    res.status(200).json({
      message: "Logged in successfully",
      user: existingUser,
      accessToken: createToken("accessToken", existingUser),
    });
  }
};
