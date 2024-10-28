import { NextResponse } from "next/server";
import db from "../../db-client";

export const GET = async () => {
  try {
    const items = await db.item.findMany({
      include: {
        _count: true,
      },
    });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
