import { model, Schema } from "mongoose";

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  _id: string;
  email: string;
  password: string;

  phoneNumber?: number;
  address?: string;
  isVerified?: boolean;
  role?: UserRoleEnum;

  createdAt: Date;
  updatedAt: Date;
};

const Users = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },

  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  isVerified: { type: Boolean, required: false },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: false,
    default: "USER",
  },

  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

Users.index({ email: 1 }, { unique: true });

export const UserModel = model<User>("Users", Users);
