import express from "express";
import productRoute from "./productRoute";
import categoryRoute from "./categoryRouter";
import userRoute from "./userRouter";

const router = express.Router();

router.use(productRoute);
router.use(categoryRoute);
router.use(userRoute);

export default router;
