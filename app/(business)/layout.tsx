import Header from "@/components/header";
import LayoutWideModal from "@/components/layout-wide-modal";
import { PropsWithChildren } from "react";

// Pages contained in this route are auth protected only
const BusinessLogicPagesLayout = async ({ children }: PropsWithChildren) => {
  // Unsafe to do it this way, now handled using middleware.ts
  // const session = await getServerSession(authOptions);

  // if (!session?.user) {
  //   redirect("/auth/signin");
  // }

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
