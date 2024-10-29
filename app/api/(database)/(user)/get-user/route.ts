import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const email = String(searchParams.get("email"));

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        cart: {
          include: {
            items: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
