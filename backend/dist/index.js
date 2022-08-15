"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const Product_1 = require("./entities/Product");
const Category_1 = require("./entities/Category");
const Cart_1 = require("./entities/Cart");
const User_1 = require("./entities/User");
const Order_1 = require("./entities/Order");
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1.default.config();
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "mysql",
        port: 3306,
        host: "mysqldb",
        database: "tsl-ec-db",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Product_1.Product, Category_1.Category, User_1.User, Cart_1.Cart, Order_1.Order],
    });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use((0, cookie_parser_1.default)());
    const PORT = 5000;
    app.get("/", (_, res) => {
        res.send("Hello 9999999");
    });
    app.use("/api/v1", productRoute_1.default);
    app.use("/api/v1", categoryRouter_1.default);
    app.use("/api/v1", userRouter_1.default);
    app.listen(PORT, () => {
        console.log("liiiiii55fffffffff555");
    });
};
main().catch((error) => console.log("ERROR", error));
//# sourceMappingURL=index.js.map