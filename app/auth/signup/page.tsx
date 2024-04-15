import { Metadata } from "next";
import Signup from "../_components/signup";

export const metadata: Metadata = {
  title: "Sign up",
};

function SignupPage() {
  return <Signup />;
}

export default SignupPage;
