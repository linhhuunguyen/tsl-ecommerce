import express from "express";
import {
  allCategory,
  createCategory,
  deleteCategory,
  detailCategory,
} from "../resolvers/categories";

const router = express.Router();

router.get("/categories", allCategory);

router.get("/category/:categoryId", detailCategory);

router.post("/category/create", createCategory);

router.delete("/category/delete/:categoryId", deleteCategory);

export default router;
