import Header from "@/components/header";
import LayoutWideModal from "@/components/layout-wide-modal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/components/auth-options";

const BusinessLogicPagesLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <>
      <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
        <Header />

        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          {children}
        </main>

        <LayoutWideModal />
      </div>
    </>
  );
};

export default BusinessLogicPagesLayout;
