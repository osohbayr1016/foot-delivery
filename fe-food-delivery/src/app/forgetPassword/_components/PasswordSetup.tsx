"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Title } from "@/app/signUp/_components/Title";
import { Input } from "@/components/ui/input";
import { BodyPicture } from "@/app/signUp/_components/BodyPicture";

const validationSchema = Yup.object({
  password: Yup.string()
    .required()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
  confirmPassword: Yup.string()
    .required()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .oneOf([Yup.ref("password")], "password chin zoroodenn"),
});

type PageProps = {
  nextStep: () => void;
};

export const PasswordSetup = ({ nextStep }: PageProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/signUp", {
          password: values.password,
        });
      } catch (err) {}
    },
  });

  const PasswordInputProps = {
    name: "password",
    value: formik.values.password,
    onChange: formik.handleChange,
    type: showPassword ? "text" : "password",
  };

  const ConfirmPasswordInputProps = {
    name: "confirmPassword",
    value: formik.values.confirmPassword,
    onChange: formik.handleChange,
    type: showPassword ? "text" : "password",
  };

  const isButtonDisabled =
    !!formik.errors.password || !!formik.errors.confirmPassword;

  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <form
          className="w-[416px] flex justify-center flex-col gap-6"
          onSubmit={formik.handleSubmit}
        >
          <Title
            title={"Create a strong password"}
            subTitle={"Create a strong password with letters, numbers."}
          />
          <Input placeholder="Password" {...PasswordInputProps} />
          <div className="text-red-500">
            {formik.touched && formik.errors.password}
          </div>
          <Input placeholder="Confirm" {...ConfirmPasswordInputProps} />
          <div className="text-red-500">
            {formik.touched && formik.errors.confirmPassword}
          </div>
          <div className="flex items-center gap-[8px]">
            <input
              type="checkbox"
              className="rounded-sm border-1 w-[16px] h-[16px]"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <p className="text-[#71717A]">Show password</p>
          </div>
          <Link href={"/logIn"}>
          <Button
            className="cursor-pointer w-full"
            type="submit"
            disabled={isButtonDisabled}
          >
            Finish
          </Button></Link>

          <p className="flex justify-center gap-3 font-[400] text-[16px] text-[#71717A]">
            Register account
            <Button className="font-[400] text-[16px] text-[#2563EB] cursor-pointer">
              <Link href={"/signUp"}>Sign Up</Link>
            </Button>
          </p>
        </form>
      </div>
      <div>
        <BodyPicture />
      </div>
    </div>
  );
};
