import { Provider } from "jotai";
import { PropsWithChildren } from "react";

// see https://jotai.org/docs/guides/nextjs
// see https://jotai.org/docs/core/store
// https://github.com/vercel/next.js/tree/canary/examples/with-jotai
const JotaiStateProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default JotaiStateProvider;
