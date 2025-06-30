"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Title } from "./Title";
import { BodyPicture } from "./BodyPicture";
import { Dispatch, SetStateAction } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .required()
    .test(
      "email",
      "Invalid email. Use a formet like example@gmail.com",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
});
type PageProps = {
  nextStep: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>
};

export const FirstSignUp = ({ nextStep, setEmail }: PageProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setEmail(values.email)
      nextStep();
    },
  });

  const emailInputProps = {
    name: "email",
    value: formik.values.email,
    onChange: formik.handleChange,
  };

  const isButtonDisabled = !formik.errors.email;
  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          <Title
            title={"Create your account"}
            subTitle={"Sign up to explore your favorite dishes"}
          />

          <form onSubmit={formik.handleSubmit} className="flex gap-[8px] flex-col">
            <Input
              placeholder="Enter your email address"
              {...emailInputProps}
            />
            <div className="text-red-500">
              {formik.touched && formik.errors.email}
            </div>
            <Button className="cursor-pointer w-full" type="submit">
              Let's Go
            </Button>
          </form>

          <p className="flex justify-center gap-3 font-[400] text-[16px] text-[#71717A]">
            Already have an account?
            <button className="font-[400] text-[16px] text-[#2563EB] cursor-pointer">
              <Link href={"/logIn"}>Log in</Link>
            </button>
          </p>
        </div>
      </div>
      <div>
        <BodyPicture />
      </div>
    </div>
  );
};
