import { Request, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const getFoodByCategory = async (_request: Request, res: Response) => {
  const result = await FoodModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo",
    },
    {
      $group: {
        _id: "$categoryInfo.categoryName",
        foods: {
          $push: {
            _id: "$_id",
            foodName: "$foodName",
            image: "$image",
            price: "$price",
            ingredients: "$ingredients",
          },
        },
      },
    },
  ]);

  const groupedByCategory = result.reduce((acc, item) => {
    acc[item._id] = item.foods;
    return acc;
  }, {});

  res.send({ foods: groupedByCategory });

  //   const allFoodsByCategory = await FoodModel.find().populate("category");

  //   res.send({ foods: allFoodsByCategory });
};
