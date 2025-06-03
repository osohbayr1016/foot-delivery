"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Title } from "./_components/Title";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordSection from "./_components/PasswordSignUp";
import { useState } from "react";
import { BodyPicture } from "./_components/BodyPicture";

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

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const emailInputProps = {
    name: "email",
    value: formik.values.email,
    onChange: formik.handleChange,
  };

  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  const isButtonDisabled = !formik.errors.email;
  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          {/* <Button className="w-[36px] h-[36px] bg-[#FFFFFF] text-black border-[#e4e4e7] border-1 cursor-pointer hover:text-white">
              <ChevronLeft />
            </Button> */}
          <Title
            title={"Create your account"}
            subTitle={"Sign up to explore your favorite dishes"}
          />

          <Input placeholder="Enter your email address" {...emailInputProps} />
          <div className="text-red-500">
            {formik.touched && formik.errors.email}
          </div>
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={!isButtonDisabled}
            onClick={handleButtonClick}
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
      <div>
        <BodyPicture />
      </div>
    </div>
  );
};

export default SignUpPage;
