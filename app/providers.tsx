"use client";

import { AuthHandlerProvider } from "@/hooks/useAuthHandlers";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <AuthHandlerProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </AuthHandlerProvider>
    </SessionProvider>
  );
};

export default Providers;
