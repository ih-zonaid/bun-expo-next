import { Platform } from "react-native";
import superjson from "superjson";

export const transformer = superjson;

export function getApiBaseUrl(): string {
  // Set default base URL
  let baseUrl = "http://localhost:3000";

  // Use production server URL if in production
  if (process.env.NODE_ENV === "production") {
    const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
    if (!serverUrl) {
      throw new Error("EXPO_PUBLIC_SERVER_URL is not defined in production");
    }
    baseUrl = serverUrl;
  }

  // Adjust for platform specifics
  if (Platform.OS === "android") {
    baseUrl = "http://10.0.2.2:3000";
  }

  return baseUrl;
}

export function getTrpcUrl() {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/trpc`;
}
