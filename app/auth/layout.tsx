import Logo from "@/components/logo";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

const AuthLayout = ({ children }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="background banner"
      />

      <Logo className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6" />

      {children}
    </div>
  );
};

export default AuthLayout;
