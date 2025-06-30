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

export const CheckEmail = ({ nextStep }: UserData) => {
  const formik = useFormik({
    initialValues: {
      email: "",
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

  const isButtonDisabled = !formik.errors.email;

  return (
    <div className="flex justify-around">
      <div className="h-screen flex justify-center">
        <div className="w-[416px] flex justify-center flex-col gap-6">
          <Title
            title={"Please verify your Email"}
            subTitle={`yvuulsan code oruuldaa andaa`}
          />
          <form onSubmit={formik.handleSubmit} className="flex gap-1 flex-col">
            <Input
              placeholder="Enter the OTP"
              {...emailInputProps}
              type="number"
              className="h-[55px] text-[35px] font-[600]"
            />
            <div className="flex gap-[10px] ">
              <Button className="cursor-pointer w-1/2 mt-[10px] bg-white text-black border-1">
                Check OTP
              </Button>
              <Button
                className="cursor-pointer w-1/2 mt-[10px]"
                disabled={!isButtonDisabled}
                onClick={nextStep}
              >
                Let's Go
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Image alt="image" src={"/Signup.png"} width={856} height={907} />
      </div>
    </div>
  );
};
