import { Platform } from "react-native";
import superjson from "superjson";

export const transformer = superjson;

export function getApiBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://bun-expo-next-web.vercel.app";
  }

  // Check if running on web or native
  if (Platform.OS === "web") {
    // Web environment
    return "http://localhost:3000";
  } else {
    // Native environment - use your machine's IP
    return "http://192.168.0.234:3000"; // Replace with your actual IP
  }
}

export function getTrpcUrl() {
  return getApiBaseUrl() + "/api/trpc";
}
