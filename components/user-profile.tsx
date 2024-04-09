"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type UserProfileProps = ComponentPropsWithoutRef<"div">;

const UserProfile = ({ className }: UserProfileProps) => {
  return (
    <div className={cn(className)}>
      <Image
        src="https://rb.gy/g1pwyx"
        alt="user"
        width={32}
        height={32}
        className="cursor-pointer rounded"
      />
    </div>
  );
};

export default UserProfile;
