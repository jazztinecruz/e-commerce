import { signIn, signOut } from "@/auth";
import api from "@/core/api";
import { Button, User as NextUIUser } from "@nextui-org/react";

const User = async () => {
  const user = await api.get.user();

  if (!user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}>
        <Button type="submit" color="primary">
          Sign in with Google
        </Button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <NextUIUser
        name={user?.name}
        description={user.email}
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
      />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <Button type="submit" color="primary">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default User;
