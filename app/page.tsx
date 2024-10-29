import { signIn, signOut } from "@/auth";
import api from "@/core/api";

const HomePage = async () => {
  const user = await api.get.user();

  if (user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <p>{user.email}</p>
        <p>{user.name}</p>
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
