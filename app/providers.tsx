"use client";

import JotaiStateProvider from "@/components/providers/jotai-provider";
import SWRConfigProvider from "@/components/providers/swr-config-provider";
import { AuthHandlerProvider } from "@/hooks/useAuthHandlers";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <AuthHandlerProvider>
        <JotaiStateProvider>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </JotaiStateProvider>
      </AuthHandlerProvider>
    </SessionProvider>
  );
};

export default Providers;
