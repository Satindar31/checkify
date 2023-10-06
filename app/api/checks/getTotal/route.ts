import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userID }: { userID: string } = await req.json();

  try {
    const total = await prisma.website.count({
      where: {
        userId: userID,
      },
    });
    return NextResponse.json(
      { total },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(err, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
