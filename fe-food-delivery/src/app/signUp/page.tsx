"use client";
import { useState } from "react";
import { FirstSignUp } from "./_components/FirstSignUp";
import PasswordSection from "./_components/PasswordSignUp";
import { useAuth } from "../_components/UserProvider";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const components = [FirstSignUp, PasswordSection];
  const Stepper = components[step];
  const prevStep = () => setStep((prev) => prev - 1);
  const nextStep = () => setStep((prev) => prev + 1);
  const [email, setEmail] = useState("");

  if (user) {
    redirect("/");
  }
  return (
    <div>
      <Stepper
        prevStep={prevStep}
        nextStep={nextStep}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
};

export default SignUpPage;
