"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Title } from "@/app/signUp/_components/Title";
import { UserData } from "../page";

const validationSchema = Yup.object({
  email: Yup.string().required(),
});

export const ForgetEmail = ({ nextStep }: UserData) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/forgetPassword",
          {
            email: values.email,
          }
        );
      } catch (err) {
        // alert("email chin buruu bnda");
      }
    },
  });
  const emailInputProps = {
    name: "email",
    value: formik.values.email,
    onChange: formik.handleChange,
  };

  const isButtonDisabled = !formik.errors.email || !formik.touched;

  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          <Title
            title={"Reset your password"}
            subTitle={"Enter your email to receive a password reset link."}
          />
          <form onSubmit={formik.handleSubmit} className="flex gap-1 flex-col">
            <Input
              placeholder="Enter your email address"
              {...emailInputProps}
            />
            <div className="text-red-500">
              {formik.touched && formik.errors.email}
            </div>
            <Button
              className="cursor-pointer w-full mt-[10px]"
              disabled={!isButtonDisabled}
              onClick={nextStep}
            >
              Let's Go
            </Button>
          </form>
          <p className="flex justify-center gap-3 font-[400] text-[16px] text-[#71717A]">
            Don't have an account?
            <Link href={"/signUp"}>
              <Button className="font-[400] text-[16px] text-[#2563EB] cursor-pointer">
                Sign up
              </Button>
            </Link>
          </p>
        </div>
      </div>
      <div>
        <Image alt="image" src={"/Signup.png"} width={856} height={907} />
      </div>
    </div>
  );
};
