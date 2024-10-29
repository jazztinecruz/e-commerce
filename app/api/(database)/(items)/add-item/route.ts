import { NextRequest, NextResponse } from "next/server";
import { Item } from "@prisma/client";
import { prisma } from "@/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body as { data: Item };

  try {
    const newItem = await prisma.item.create({
      data,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
