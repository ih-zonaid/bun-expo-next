export { createCaller } from "./src/api/root";

export { createTRPCContext } from "./src/api/trpc";

export type { AppRouter } from "./src/api/root";
export { appRouter } from "./src/api/root";

console.log("Server package loaded");
