"use client";

import { cn } from "@/lib/cn";
import React, { ComponentPropsWithRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type AuthFormInputProps = ComponentPropsWithRef<"input"> & {
  validationErr: FieldError | undefined;
  errorMsg: string | undefined;
};

const AuthFormInput = forwardRef<HTMLInputElement, AuthFormInputProps>(
  function AuthInput(
    { className, type, placeholder, validationErr, errorMsg, ...restProps },
    ref
  ) {
    return (
      <div>
        {" "}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn(
            "input",
            validationErr ? "border-b-2 border-orange-500" : "",
            className
          )}
          {...restProps}
        />
        {validationErr && (
          <p className="p-1 text-[13px] font-light  text-orange-500">
            {errorMsg ? errorMsg : "Invalid input"}
          </p>
        )}
      </div>
    );
  }
);

export default AuthFormInput;
