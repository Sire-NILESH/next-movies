"use client";

import useAuthHandlers from "@/hooks/useAuthHandlers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthForm from "../_components.tsx/auth-form";
import AuthFormButton from "../_components.tsx/auth-form-btn";
import AuthFormInput from "../_components.tsx/auth-form-input";
import { toastStyle } from "@/constants/toast-styles";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

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
    await signupHandler(data.email, data.password);
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
