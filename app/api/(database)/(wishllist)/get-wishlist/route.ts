import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body as { id: number };

  try {
    const wishlistItems = await prisma.wishlist.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return NextResponse.json(wishlistItems, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
