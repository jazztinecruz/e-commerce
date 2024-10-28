import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const HomePage = async () => {
  const users = await db.user.findMany();

  console.log({ users });
  return <div>HomePage</div>;
};

export default HomePage;
