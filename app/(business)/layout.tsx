import React, { PropsWithChildren } from "react";
import Header from "@/components/header";
import LayoutWideModal from "@/components/layout-wide-modal";

const BusinessLogicPagesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {children}
      </main>

      <LayoutWideModal />
    </div>
  );
};

export default BusinessLogicPagesLayout;
