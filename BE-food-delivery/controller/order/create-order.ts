import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/order";

export const createOrder = async (Req: Request, Res: Response) => {
  const {  totalPrice, foodOrderItems, address } = Req.body;
  const { userId } = Res.locals

  try {
    await FoodOrderModel.create({ user: userId, totalPrice, foodOrderItems, address });
    Res.status(200).send({ message: "Successfully created order" });
  } catch (err) {
    Res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
    return;
  }
};
