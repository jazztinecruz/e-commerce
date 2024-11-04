import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

type BodyRequest = {
  userId: string;
  itemId: number;
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: BodyRequest };

  try {
    const newItem = await prisma.wishlist.create({
      data,
      include: {
        user: true,
        item: true,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
