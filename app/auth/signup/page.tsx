"use client";

import useAuth from "@/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import AuthForm from "../_components.tsx/auth-form";
import AuthFormInput from "../_components.tsx/auth-form-input";
import AuthFormButton from "../_components.tsx/auth-form-btn";
import Link from "next/link";
import { useState } from "react";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signUp(data.email, data.password);
    reset();
  };

  return (
    <AuthForm heading="Sign Up" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <AuthFormInput
            type="email"
            placeholder="Email"
            validationErr={errors.email}
            errorMsg="Please enter a valid email."
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
            })}
          />
        </label>

        <label className="inline-block w-full">
          <AuthFormInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            validationErr={errors.password}
            errorMsg="Your password must contain between 6 and 14 characters."
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 14,
            })}
          />
        </label>

        <label className="inline-block w-full">
          <AuthFormInput
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            validationErr={errors.confirmPassword}
            errorMsg="Passwords do not match."
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
              maxLength: 14,
              validate: (value) => value === watch("password"),
            })}
          />
        </label>

        <div className="flex space-x-2 items-center">
          <input
            id="showPasswordCheckbox"
            type="checkbox"
            className="h-4 w-4 accent-[#E50914]"
            onChange={toggleShowPassowrdHandler}
          />
          <label htmlFor="showPasswordCheckbox">Show passwords</label>
        </div>
      </div>

      <AuthFormButton type="submit">Sign Up</AuthFormButton>

      <Toaster position="bottom-center" />

      <div className="text-[gray]">
        Already have an account?{" "}
        <Link
          className="cursor-pointer text-white hover:underline"
          href={"/auth/signin"}
        >
          Sign in now
        </Link>
      </div>
    </AuthForm>
  );
}

export default Signup;
