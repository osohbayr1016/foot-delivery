import { model, Schema } from "mongoose";

export type FoodType = {
  _id: Schema.Types.ObjectId;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const FoodSchema = new Schema<FoodType>({
  foodName: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Categories" },

  createdAt: { type: Date, required: true, default: Date.now, immutable: true },
  updatedAt: { type: Date, required: true, default: Date.now },
});

FoodSchema.index({ foodName: 1 }, { unique: true });

export const FoodModel = model<FoodType>("Foods", FoodSchema);
