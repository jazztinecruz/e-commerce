import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@prisma/client";
import { prisma } from "@/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: CartItem };

  try {
    const cartItem = await prisma.cartItem.create({
      data,
      include: {
        item: true,
        cart: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
