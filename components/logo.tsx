import { siteConfig } from "@/constants/stite";
import { cn } from "@/lib/cn";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const Logo = ({ className }: Props) => {
  return (
    <div className={cn([className])}>
      <Link href="/">
        <p className="text-[#E50914] text-2xl lg:text-3xl font-extrabold uppercase tracking-wider text-shadow-md">
          {siteConfig.title}
        </p>
      </Link>
    </div>
  );
};

export default Logo;
