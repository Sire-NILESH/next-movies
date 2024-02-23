"use client";

import useAuthHandlers from "@/hooks/useAuthHandlers";
import { cn } from "@/lib/cn";
import Image from "next/image";
import React, { ComponentPropsWithoutRef } from "react";

type UserProfileProps = ComponentPropsWithoutRef<"div">;

const UserProfile = ({ className }: UserProfileProps) => {
  const { signoutHandler } = useAuthHandlers();

  return (
    <div className={cn(className)}>
      <Image
        src="https://rb.gy/g1pwyx"
        onClick={signoutHandler}
        alt="user"
        width={32}
        height={32}
        className="cursor-pointer rounded"
      />
    </div>
  );
};

export default UserProfile;
