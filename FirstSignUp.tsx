"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Title } from "./Title";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .required()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
});

const FirstSignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const NewPasswordInputProps = {
    name: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
  };
  const PasswordInputProps = {
    name: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
  };

  const isButtonDisabled = !formik.errors.password;

  const passwordCheckbox = () => {
    if (true) {
    } else {
    }
  };
  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          <Button className="w-[36px] h-[36px] bg-[#FFFFFF] text-black border-[#e4e4e7] border-1 cursor-pointer hover:text-white">
            <ChevronLeft />
          </Button>
          <Title
            title={"Create a strong password"}
            subTitle={"Create a strong password with letters, numbers."}
          />

          <Input
            placeholder="Password"
            {...NewPasswordInputProps}
            type="password"
          />
          <div className="text-red-500">
            {formik.touched && formik.errors.password}
          </div>
          <Input
            placeholder="Confirm"
            {...PasswordInputProps}
            type="password"
          />
          <div className="text-red-500">
            {formik.touched && formik.errors.password}
          </div>
          <div className="flex items-center gap-[8px]">
            <Input
              type="checkbox"
              className="rounded-sm border-1 w-[16px] h-[16px]"
            />
            <p className="text-[#71717A]">Show password</p>
          </div>
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={!isButtonDisabled}
          >
            Let's Go bro
          </Button>
          <p className="flex justify-center gap-3 font-[400] text-[16px] text-[#71717A]">
            Already have an account?
            <button className="font-[400] text-[16px] text-[#2563EB] cursor-pointer">
              <Link href={"/logIn"}>Log in</Link>
            </button>
          </p>
        </div>
      </div>

      {/* <div>
        <Image alt="image" src={"/Signup.png"} width={856} height={907} />
      </div> */}
    </div>
  );
};

export default FirstSignUpPage;
