"use client";

import { cn } from "@/lib/cn";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type AuthFormBtnProps = React.ComponentPropsWithoutRef<"button"> & {
  loading: boolean;
};

const LoadingSpinner = () => (
  <AiOutlineLoading3Quarters className="animate-spin size-5 text-white mx-auto" />
);

const AuthFormButton = ({
  className,
  children,
  onClick,
  type,
  loading,
  disabled,
  ...restProps
}: AuthFormBtnProps) => {
  return (
    <button
      className={cn(
        "w-full rounded bg-[#E50914] font-semibold min-h-12",
        className,
        disabled && "cursor-not-allowed"
      )}
      onClick={onClick}
      type={type ? type : "submit"}
      disabled={disabled}
      {...restProps}
    >
      {!loading ? children : <LoadingSpinner />}
    </button>
  );
};

export default AuthFormButton;
