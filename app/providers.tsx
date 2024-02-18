"use client"

import { AuthProvider } from "@/hooks/useAuth";
import React from "react";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <RecoilRoot>
      <AuthProvider>{children}</AuthProvider>
    </RecoilRoot>
  );
};

export default Providers;
