import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./router/user.route";
import { CategoryRouter } from "./router/category.route";
import { FoodRouter } from "./router/food.route";
import { OrderRouter } from "./router/order.route";
import { AdminRouter } from "./router/admin.route";

const server = express();
server.use(cors());
server.use(express.json());

const dataBaseStart = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Twissu:ZM0PFz7vV8fxlx26@delivery.uzuckm9.mongodb.net/"
    );
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
    throw new Error("Data base asssangu");
  }
};
dataBaseStart();

server.use(UserRouter);
server.use(CategoryRouter);
server.use(FoodRouter);
server.use(OrderRouter);
server.use(AdminRouter);

server.listen(8000, () => {
  console.log("https://foot-delivery-p31l.onrender.com");
});
