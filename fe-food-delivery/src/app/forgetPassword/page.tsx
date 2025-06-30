"use client";
import * as Yup from "yup";
import { useState } from "react";
import { CheckEmail } from "./_components/CheckEmail";
import { ForgetEmail } from "./_components/ForgetEmail";
import { PasswordSetup } from "./_components/PasswordSetup";

export type UserData = {
  nextStep: () => void;
};

const validationSchema = Yup.object({
  email: Yup.string().required(),
});

const ForgetPassword = () => {
  const [step, setStep] = useState(0);
  const components = [ForgetEmail, CheckEmail, PasswordSetup];
  const Stepper = components[step];

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div>
      <Stepper nextStep={nextStep} />
    </div>
  );
};

export default ForgetPassword;
