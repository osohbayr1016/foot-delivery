import { Request, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const addFood = async (request: Request, response: Response) => {
  try {
    const { foodName, price, category, ingredients, image } = request.body;

    await FoodModel.create({
      foodName,
      price,
      category,
      ingredients,
      image,
    });

    response.status(200).send({ message: "successfully added food" });
  } catch (err) {
    response.status(400).send({ message: "hool chin nemegdku bshde ", err });
  }
};
