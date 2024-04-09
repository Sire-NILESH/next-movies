import UserListRow from "@/components/user-list-row";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My List",
};

const MyListpage = () => {
  return (
    <>
      <section className="mt-32 md:space-y-24">
        {/* My List */}
        <UserListRow />
      </section>
    </>
  );
};

export default MyListpage;
