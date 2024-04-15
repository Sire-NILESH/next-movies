"use client";

import { toastStyle } from "@/constants/toast-styles";
import useAuthHandlers from "@/hooks/useAuthHandlers";
import { SignUpSchema, TSignUpSchema } from "@/lib/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthForm from "./auth-form";
import AuthFormButton from "./auth-form-btn";
import AuthFormInput from "./auth-form-input";

export const metadata: Metadata = {
  title: "Sign up",
};

function Signup() {
  const {
    signupHandler,
    loading,
    actionSuccess,
    error: authErr,
    resetAuthHandlerStates,
  } = useAuthHandlers();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    await signupHandler({
      email: data.email,
      name: data.name,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    reset();
  };

  useEffect(() => {
    if (actionSuccess) {
      toast("Sign up successful, now Sign in with this new account", {
        duration: 8000,
        style: toastStyle,
      });
    }

    if (authErr) {
      toast(authErr.message, {
        duration: 8000,
        style: toastStyle,
      });
    }
  }, [actionSuccess, authErr]);

  return (
    <AuthForm heading="Sign Up" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <AuthFormInput
            type="string"
            placeholder="Name"
            validationErr={errors.name}
            // errorMsg="Please enter a valid name."
            {...register("name", {
              required: true,
            })}
          />
        </label>

        <label className="inline-block w-full">
          <AuthFormInput
            type="email"
            placeholder="Email"
            validationErr={errors.email}
            // errorMsg="Please enter a valid email."
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
            // errorMsg="Your password must contain between 6 and 14 characters."
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

      <AuthFormButton disabled={loading} loading={loading} type="submit">
        Sign Up
      </AuthFormButton>

      <div className="text-[gray]">
        Already have an account?{" "}
        <button
          role="link"
          type="button"
          className="cursor-pointer text-white hover:underline"
          onClick={() => {
            resetAuthHandlerStates();
            router.push("/auth/signin");
          }}
        >
          Sign in now
        </button>
      </div>
    </AuthForm>
  );
}

export default Signup;
