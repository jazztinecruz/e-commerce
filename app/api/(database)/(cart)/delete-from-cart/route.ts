import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body as { id: number };

  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Item Deleted Successfully in Cart", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
