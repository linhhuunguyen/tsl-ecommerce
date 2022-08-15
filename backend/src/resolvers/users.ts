import argon2d from "argon2";
import { Request, Response } from "express";
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
