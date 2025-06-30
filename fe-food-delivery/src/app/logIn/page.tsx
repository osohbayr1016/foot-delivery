"use client";

import { Button } from "@/components/ui/button";
import { Title } from "../signUp/_components/Title";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../_components/UserProvider";

const validationSchema = Yup.object({
  password: Yup.string().required(),
  email: Yup.string().required(),
});

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, tokenChecker } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/logIn", {
          email: values.email,
          password: values.password,
        });
        localStorage.setItem("token", response.data.token);
        const isAdmin = await tokenChecker(response.data.token);
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
  });

  const PasswordInputProps = {
    name: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
    type: showPassword ? "text" : "password",
  };

  const emailInputProps = {
    name: "email",
    value: formik.values.email,
    onChange: formik.handleChange,
  };

  const isButtonDisabled = !formik.errors.password || !formik.errors.email;
  if (user?.userId) {
    if (user?.isAdmin) {
      redirect("/admin/orders");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          <Title
            title={"Log in"}
            subTitle={"Log in to enjoy your favorite dishes."}
          />
          <form onSubmit={formik.handleSubmit} className="flex gap-1 flex-col">
            <Input
              placeholder="Enter your email address"
              {...emailInputProps}
            />
            <div className="text-red-500">
              {formik.touched && formik.errors.email}
            </div>
            <Input placeholder="Password" {...PasswordInputProps} />
            <div className="text-red-500">
              {formik.touched && formik.errors.password}
            </div>
            {/* <div className="flex items-center gap-[8px]">
            <input
              type="checkbox"
              className="rounded-sm border-1 w-[16px] h-[16px]"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <p className="text-[#71717A]">Show password</p>
          </div> */}
            <button className="font-[400] text-[14px] text-[#18181B] cursor-pointer flex">
              <Link href={"/forgetPassword"}>Forgot Password ?</Link>
            </button>
            <Button
              className="cursor-pointer w-full"
              disabled={!isButtonDisabled}
            >
              Let's Go
            </Button>
          </form>
          <p className="flex justify-center gap-3 font-[400] text-[16px] text-[#71717A]">
            Don't have an account?
            <button className="font-[400] text-[16px] text-[#2563EB] cursor-pointer">
              <Link href={"/signUp"}>Sign up</Link>
            </button>
          </p>
        </div>
      </div>
      <div>
        <Image alt="image" src={"/Signup.png"} width={856} height={907} />
      </div>
    </div>
  );
};

export default LogInPage;
