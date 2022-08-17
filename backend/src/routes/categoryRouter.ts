import express from "express";
import { isAuthenticatedUser } from "../middlewares/checkAuth";
import {
  allCategory,
  createCategory,
  deleteCategory,
  detailCategory,
} from "../resolvers/categories";

const router = express.Router();

router.get("/categories", isAuthenticatedUser, allCategory);

router.get("/category/:categoryId", detailCategory);

router.post("/category/create", createCategory);

router.delete("/category/delete/:categoryId", deleteCategory);

export default router;
