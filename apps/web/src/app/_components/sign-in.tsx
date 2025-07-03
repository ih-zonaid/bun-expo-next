"use client";
import { authClient } from "~/lib/auth-client";
import { api } from "~/trpc/react";

async function signInWithGoogle() {
  try {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    // Handle successful sign-in (e.g., redirect, show message)
    console.log("Signed in:", data);
  } catch (error) {
    // Handle errors
    console.error("Sign-in error:", error);
  }
}

async function signOut() {
  try {
    await authClient.signOut();
    console.log("Signed out");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
}

export function Profile() {
  const { data: session, isPending } = authClient.useSession();
  const user = api.post.protectedProcedure.useQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <p>Please sign in to access your profile</p>
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Welcome!</h2>
        <p className="text-gray-600">
          {session.user.name || session.user.email}
        </p>
        {session.user.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full mx-auto mt-2"
          />
        )}
        {user.data && <p>for tprc protected: {user.data.name}</p>}
      </div>
      <button
        onClick={signOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
