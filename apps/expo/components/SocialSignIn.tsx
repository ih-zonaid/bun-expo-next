import { authClient } from "@/utils/auth";
import { getApiBaseUrl } from "@/utils/urls";
import { Button, Text } from "react-native";

export default function SocialSignIn() {
  console.debug(
    "Api base url: ",
    getApiBaseUrl(),
    "|| node-env:",
    process.env.NODE_ENV
  );
  const handleLogin = async () => {
    console.debug("Starting social sign-in");
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      // callbackURL: "/dashboard", // this will be converted to a deep link (eg. `myapp://dashboard`) on native
    });

    console.debug("Social sign-in result:", res);
  };
  const { data: session } = authClient.useSession();

  if (session) {
    const handleLogout = async () => {
      await authClient.signOut();
    };
    return (
      <>
        <Text>Welcome, {session.user.name}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </>
    );
  }
  return <Button title="Login with Google" onPress={handleLogin} />;
}
