"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { toastStyle } from "@/constants/toast-styles";
import useAuthHandlers from "@/hooks/useAuthHandlers";
import { SignInSchema, TSignInSchema } from "@/lib/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "./auth-form";
import AuthFormButton from "./auth-form-btn";
import AuthFormInput from "./auth-form-input";

export const metadata: Metadata = {
  title: "Sign in",
};

function Signin() {
  const {
    signinHandler,
    loading,
    actionSuccess,
    error: authErr,
    resetAuthHandlerStates,
  } = useAuthHandlers();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignInSchema>({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    await signinHandler(data.email, data.password);
    reset();
  };

  useEffect(() => {
    if (actionSuccess && status === "authenticated") {
      toast("Sign in successful", {
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
  }, [status, authErr, actionSuccess]);

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} heading="Sign In">
      <div className="space-y-4">
        <label className="inline-block w-full">
          <AuthFormInput
            type="email"
            placeholder="Email"
            validationErr={errors.email}
            // errorMsg="Please enter a valid email."
            {...register("email", { required: true })}
          />
        </label>

        <label className="inline-block w-full">
          <AuthFormInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            validationErr={errors.password}
            // errorMsg="Your password must be between 6 to 14 characters only."
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

      <AuthFormButton disabled={loading} loading={loading} type="submit">
        Sign In
      </AuthFormButton>

      <div className="text-[gray]">
        New here?{" "}
        <button
          role="link"
          type="button"
          className="cursor-pointer text-white hover:underline"
          onClick={() => {
            resetAuthHandlerStates();
            router.push("/auth/signup");
          }}
        >
          Sign up now
        </button>
      </div>
    </AuthForm>
  );
}

export default Signin;
