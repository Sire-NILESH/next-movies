"use client";

import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import axios from "axios";

// import ReactDOM from "react-dom";

// see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#link-relpreload
// Also
// see https://swr.vercel.app/docs/prefetching#top-level-page-data
// export function PreloadResources() {
//   ReactDOM.preload("/api/v1/user-list", {
//     as: "fetch",
//     crossOrigin: "anonymous",
//   });

//   // <link rel="preload" href="/api/v1/user-list" as="fetch" crossorigin="anonymous">
//   return null;
// }

const SWRConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        //   refreshInterval: 3000,
        fetcher: (resource, init) =>
          axios.get(resource, init).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
