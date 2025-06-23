import { Request, Response } from "express";
import { CategoryModel } from "../../model/category";

export const createCategory = async (request: Request, res: Response) => {
  try {
    const { categoryName } = request.body;

    await CategoryModel.create({ categoryName });
    res.send({ message: "Successfully created category" });
  } catch (err) {
    res.status(400).send({ message: "Category ner davhtsaj bolohgui" });
  }
};
