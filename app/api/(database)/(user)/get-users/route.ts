import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
