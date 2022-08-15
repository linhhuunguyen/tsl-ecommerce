import { Request, Response } from "express";
import { Between, FindOptionsOrderValue, getManager } from "typeorm";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, categoryId } = req.body;

  const product = await Product.create({ name, price, description });

  const category: Category | null = await Category.findOneBy({
    id: Number(categoryId),
  });

  if (!category) {
    res.status(400).json({
      status: "error",
      msg: "Category does not exist",
    });
  } else {
    const categoryTree = await getManager()
      .getTreeRepository(Category)
      .findDescendantsTree(category);

    product.categories = [categoryTree];
  }

  await product.save();
  res.status(201).json(product);
};

export const allProducts = async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const totalItem = await Product.count();
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);

    const products = await Product.find({
      relations: {
        categories: true,
    },
      order: {
        [req.query.sortBy as string]: req.query.sort as FindOptionsOrderValue,
      },
      where: {
        price: Between(minPrice, maxPrice),
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    const response = {
      data: products,
      page,
      pageSize,
      totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log("id", productId);

  try {
    const product = await Product.findOneBy({ id: Number(productId) });

    console.log("product", product);

    // if (!product) {
    //   return res.status(404).json("Product not found");
    // }

    const updateProduct = await Product.update(
      { id: Number(productId) },
      req.body
    );

    console.log("new product", updateProduct);

    res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error);
  }
};
