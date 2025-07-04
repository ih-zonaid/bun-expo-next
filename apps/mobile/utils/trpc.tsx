import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@packages/server"; // Adjust the import path as needed

import { Platform } from "react-native";
import { getTrpcUrl, transformer } from "./urls";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          transformer,
          // fetch: async (url, options) => {
          //   console.log("TRPC fetch URL:", url);
          //   return fetch(url, {
          //     ...options,
          //     // credentials: "include", // This is the key part for web
          //   });
          // },
          url: getTrpcUrl(),
          headers() {
            const headers = new Map<string, string>();
            if (Platform.OS != "web") {
              //   const cookies = authClient.getCookie();
              //   if (cookies) {
              //     headers.set("Cookie", cookies);
              //   }
            }

            console.log("TRPC headers:", headers);

            return Object.fromEntries(headers);
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
