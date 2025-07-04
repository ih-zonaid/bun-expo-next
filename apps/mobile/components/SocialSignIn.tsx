import { authClient } from "@/utils/auth";
import { Button, Text } from "react-native";

export default function SocialSignIn() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:8081", // this will be converted to a deep link (eg. `myapp://dashboard`) on native
    });
  };
  const { data: session } = authClient.useSession();

  if (session) {
    return <Text>Welcome, {session.user.name}</Text>;
  }
  return <Button title="Login with Google" onPress={handleLogin} />;
}
