import { cn } from "@/lib/cn";
import { ComponentPropsWithoutRef } from "react";

type AuthFormProps = ComponentPropsWithoutRef<"form"> & {
  heading?: string;
};

const AuthForm = ({
  className,
  heading,
  onSubmit,
  children,
  ...restProps
}: AuthFormProps) => {
  return (
    <form
      className={cn(
        "relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14",
        className
      )}
      onSubmit={onSubmit}
      {...restProps}
    >
      {heading ? <h1 className="text-4xl font-semibold">{heading}</h1> : null}

      {children}
    </form>
  );
};

export default AuthForm;
