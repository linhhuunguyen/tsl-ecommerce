import express from "express";
import { createProduct, allProducts, editProduct } from "../resolvers/products";

const router = express.Router();

router.get("/products", allProducts);

router.post("/product/create", createProduct);

router.put('/edit-product/:productId', editProduct)

export default router;
