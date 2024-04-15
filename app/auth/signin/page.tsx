import { Metadata } from "next";
import Signin from "../_components/signin";

export const metadata: Metadata = {
  title: "Sign in",
};

function SigninPage() {
  return <Signin />;
}

export default SigninPage;
