import { NextRequest, NextResponse } from "next/server";
import db from "../../db-client";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { userId } = body as { userId: number };

  try {
    const cart = await db.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
