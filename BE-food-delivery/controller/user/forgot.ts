import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OtpModel, OtpPopulated } from "../../model/otp.model";
import nodemailer from "nodemailer";

export const sendOtp = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    response.status(404).send({ message: "User not found" });
    return;
  }

  const otp = 1234;

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "osohbayaroyunburen@gmail.com",
      pass: "sevgtbprlszgrxwd",
    },
  });

  const options = {
    from: "osohbayaroyunburen@gmail.com",
    to: email,
    subject: "Your otp",
    html: `<div style="color:red"> ${otp} </div>`,
  };

  await OtpModel.create({ code: otp, userId: isEmailExisted._id });

  await transport.sendMail(options);

  response.send({ message: "OTP send" });
};

export const checkOtp = async (request: Request, response: Response) => {
  const { code, email } = request.body;

  try {
    const isOtpExisting = await OtpModel.findOne({
      code,
    }).populate<OtpPopulated>("userId");

    if (!isOtpExisting) {
      response.status(400).send("wrong code");
      return;
    }

    if (email === isOtpExisting?.userId?.email) {
      response.status(200).send({ message: "success" });
      return;
    }

    response.status(400).send("wrong code");
    return;
  } catch (err) {
    response.status(400).send("wrong OTP");
  }
};

export const updatePassword = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    response.status(400).send({ message: "User not found" });
    return;
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);

  await UserModel.findByIdAndUpdate({ email }, { password: hashedPassword });
};
