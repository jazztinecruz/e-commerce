import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async () => {
  try {
    const items = await prisma.item.findMany({
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
