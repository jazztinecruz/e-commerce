import { NextRequest, NextResponse } from "next/server";
import db from "../../db-client";

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body as { id: number };

  try {
    const cartItem = await db.cartItem.delete({
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
