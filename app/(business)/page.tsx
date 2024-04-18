import { redirect } from "next/navigation";

const RootPage = async () => {
  redirect("/home");
};

export default RootPage;
