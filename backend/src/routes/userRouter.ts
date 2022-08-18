import express from "express";
import { Secret, verify } from "jsonwebtoken";
import { login, register } from "../resolvers/users";
import { User } from "../entities/User";
import { createToken, sendRefreshToken } from "../utils/auth";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/refresh_token", async (req, res) => {
  const refreshToken =
    req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

  console.log("liiii", refreshToken);

  if (!refreshToken) return res.sendStatus(401);

  try {
    const decodeUser = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as any;

    const existingUser = await User.findOneBy({
      id: Number(decodeUser.userId),
    });

    if (!existingUser) {
      return res.sendStatus(401);
    }

    sendRefreshToken(res, existingUser);

    console.log("hhhhhhh", sendRefreshToken(res, existingUser));

    return res.json({
      success: true,
      accessToken: createToken("accessToken", existingUser),
    });
  } catch (error) {
    console.log("ERROR REFRESHING TOKEN", error);
    return res.sendStatus(403);
  }
});

export default router;
