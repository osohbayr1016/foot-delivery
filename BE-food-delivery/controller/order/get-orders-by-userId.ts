import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/order";

export const getOrdersByUserId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;

  try {
    const allOrdersByUserId = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    });

    res.status(200).send({ foods: allOrdersByUserId })
  } catch (err) {
    res.status(400).send({ message: "Cannot get orders" });
    return;
  }
};
