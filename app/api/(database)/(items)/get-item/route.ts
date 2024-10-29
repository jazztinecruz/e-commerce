import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = parseInt(String(searchParams.get("id")));

  try {
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
