import express from "express";
import { register } from "../resolvers/users";

const router = express.Router();

router.post("/register", register);

export default router;
