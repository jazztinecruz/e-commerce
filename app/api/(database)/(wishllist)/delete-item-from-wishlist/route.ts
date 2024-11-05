import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body as { id: number };

  try {
    await prisma.wishlistItems.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Wishlist Item Deleted Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
