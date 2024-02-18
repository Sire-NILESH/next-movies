"use client";

import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/cn";
import Image from "next/image";
import React, { ComponentPropsWithoutRef } from "react";

type UserProfileProps = ComponentPropsWithoutRef<"div">;

const UserProfile = ({ className }: UserProfileProps) => {
  const { logout } = useAuth();

  return (
    <div className={cn(className)}>
      <Image
        src="https://rb.gy/g1pwyx"
        onClick={logout}
        alt="user"
        width={32}
        height={32}
        className="cursor-pointer rounded"
      />
    </div>
  );
};

export default UserProfile;
