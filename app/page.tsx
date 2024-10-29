import { auth, signIn, signOut } from "@/auth";

const HomePage = async () => {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <h1>User</h1>
        <p>{session.user?.email}</p>
        <p>{session.user?.name}</p>
        <button type="submit">Sign Out</button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}>
      <button type="submit">Signin with Google</button>
    </form>
  );
};

export default HomePage;
