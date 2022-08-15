import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { Product } from "./entities/Product";
import { Category } from "./entities/Category";
import { Cart } from "./entities/Cart";
import { User } from "./entities/User";
import { Order } from "./entities/Order";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRouter";
import userRoute from "./routes/userRouter";

dotenv.config();

const main = async () => {
  await createConnection({
    type: "mysql",
    port: 3306,
    host: "mysqldb",
    database: "tsl-ec-db",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Product, Category, User, Cart, Order],
  });

  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use(cookieParser());

  const PORT = 5000;
  app.get("/", (_, res) => {
    res.send("Hello 9999999");
  });

  app.use("/api/v1", productRoute);
  app.use("/api/v1", categoryRoute);
  app.use("/api/v1", userRoute);

  app.listen(PORT, () => {
    console.log("liiiiii55fffffffff555");
  });
};

main().catch((error) => console.log("ERROR", error));
