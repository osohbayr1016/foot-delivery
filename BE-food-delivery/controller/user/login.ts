import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    response.status(404).send({ message: "email or password not matching" });
    return;
  }
  const hashedPassword = await bcrypt.compareSync(
    password,
    isEmailExisted.password
  );

  if (hashedPassword) {
    const tokenPassword = "foodDelivery";
    const token = jwt.sign({ userId: isEmailExisted._id }, tokenPassword);
    response.send({ message: "Successfully logged in", token: token });
    return;
  } else {
    response.status(404).send({ message: "email or password not matching" });
    return;
  }
};
