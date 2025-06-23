import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { addFood } from "../controller/food/add-food";
import { getFoodByCategory } from "../controller/food/get-foods-by-category";

export const FoodRouter = Router();

FoodRouter.post("/addFood", tokenChecker, addFood);
FoodRouter.get("/foods", getFoodByCategory);
