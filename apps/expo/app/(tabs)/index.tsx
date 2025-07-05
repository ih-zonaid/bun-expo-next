import { Image } from "expo-image";
import { Platform, StyleSheet, Text as ThemedText } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

import { api } from "@/utils/trpc";
import SocialSignIn from "@/components/SocialSignIn";
import { getApiBaseUrl } from "@/utils/urls";

export default function HomeScreen() {
  const data = api.post.hello.useQuery(
    { text: "from tRPC" },
    {
      retry: false, // Disable retries for debugging
    }
  );
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {data.isLoading ? (
        <ThemedText>Loading tRPC query...</ThemedText>
      ) : (
        <ThemedText>
          {data.data ? data.data.greeting : "No greeting available"}
          {getApiBaseUrl()}
        </ThemedText>
      )}
      {data.isError && (
        <ThemedText>{`Error: ${data.error.message}`}</ThemedText>
      )}

      <SocialSignIn />
      <ThemedText>Step 1: Try it</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
