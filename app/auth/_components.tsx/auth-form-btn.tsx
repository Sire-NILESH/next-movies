"use client";

import { cn } from "@/lib/cn";
import React from "react";

type AuthFormBtnProps = React.ComponentPropsWithoutRef<"button">;

const AuthFormButton = ({
  className,
  children,
  onClick,
  type,
}: AuthFormBtnProps) => {
  return (
    <button
      className={cn(
        "w-full rounded bg-[#E50914] py-3 font-semibold",
        className
      )}
      onClick={onClick}
      type={type ? type : "submit"}
    >
      {children}
    </button>
  );
};

export default AuthFormButton;
