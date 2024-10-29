import { auth } from "@/auth";
import { User } from "@prisma/client";

const getUser = async () => {
  try {
    const session = await auth();
    if (!session) return null;

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-user?email=${session.user?.email}`;

    const user = await fetch(URL).then((res) => res.json());
    return user as User;
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
