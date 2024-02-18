"use client";

import useAuth from "@/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import AuthFormButton from "../_components.tsx/auth-form-btn";
import AuthFormInput from "../_components.tsx/auth-form-input";
import Link from "next/link";
import AuthForm from "../_components.tsx/auth-form";
import { useState } from "react";

interface Inputs {
  email: string;
  password: string;
}

function Signin() {
  const { signIn } = useAuth();
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
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signIn(data.email, data.password);
    reset();
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} heading="Sign In">
      <div className="space-y-4">
        <label className="inline-block w-full">
          <AuthFormInput
            type="email"
            placeholder="Email"
            validationErr={errors.email}
            errorMsg="Please enter a valid email."
            {...register("email", { required: true })}
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

      <AuthFormButton type="submit">Sign In</AuthFormButton>

      <Toaster position="bottom-center" />

      <div className="text-[gray]">
        New here?{" "}
        <Link
          className="cursor-pointer text-white hover:underline"
          href={"/auth/signup"}
        >
          Sign up now
        </Link>
      </div>
    </AuthForm>
  );
}

export default Signin;
