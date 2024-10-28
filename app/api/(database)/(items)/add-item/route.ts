import { NextRequest, NextResponse } from "next/server";
import db from "../../db-client";
import { Item } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: Item };

  try {
    const newItem = await db.item.create({
      data,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
