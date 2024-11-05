import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

type BodyRequest = {
  wishlistId: number;
  itemId: number;
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: BodyRequest };

  try {
    const newSavedItem = await prisma.wishlistItems.create({
      data: {
        wishlistId: data.wishlistId,
        itemId: data.itemId,
      },
    });

    return NextResponse.json(newSavedItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
