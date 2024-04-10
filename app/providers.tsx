"use client";

import SWRConfigProvider from "@/components/swr-config-provider";
import { AuthHandlerProvider } from "@/hooks/useAuthHandlers";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <AuthHandlerProvider>
        <RecoilRoot>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </RecoilRoot>
      </AuthHandlerProvider>
    </SessionProvider>
  );
};

export default Providers;
