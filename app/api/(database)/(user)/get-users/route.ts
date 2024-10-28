import { NextResponse } from "next/server";
import db from "../../db-client";

export const GET = async () => {
  try {
    const users = await db.user.findMany({
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
