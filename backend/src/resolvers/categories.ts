import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Category } from "../entities/Category";

export const createCategory = async (req: Request, res: Response) => {
  const { name, parent } = req.body;

  const newCategory = Category.create({ name });

  console.log("parent", newCategory);

  if (parent) {
    const existingParent: Category | null = await Category.findOneBy({
      id: Number(parent),
    });
    if (!existingParent) {
      res.status(400).json({
        status: "error",
        msg: "Category does not exist",
      });
    } else {
      newCategory.parentCategory = existingParent;
    }
  }

  await newCategory.save();
  
  res.status(200).json({
    status: "success",
    Category: newCategory,
  });
};

export const allCategory = async (_req: Request, res: Response) => {
  // const categories = await Category.find();

  const treeCategory = await getManager()
    .getTreeRepository(Category)
    .findTrees();

  res.status(200).json(treeCategory);
};

export const detailCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const existingParent: Category | null = await Category.findOneBy({
    id: Number(categoryId),
  });

  if (!existingParent) {
    res.status(400).json({
      status: "error",
      msg: "Category does not exist",
    });
  } else {
    const categoryTree = await getManager()
      .getTreeRepository(Category)
      .findDescendantsTree(existingParent);

    res.status(200).json({
      status: "success",
      categoryTree,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const category = await Category.findOneBy({ id: Number(categoryId) });

  await category?.remove();

  res.status(200).json({
    success: true,
    message: "Category Delete Successfully",
  });
};
