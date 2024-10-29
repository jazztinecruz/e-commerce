import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { CATEGORY } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = String(
    searchParams.get("category")
  ) as keyof typeof CATEGORY;

  try {
    const items = await prisma.item.findMany({
      where: {
        category,
      },
    });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
