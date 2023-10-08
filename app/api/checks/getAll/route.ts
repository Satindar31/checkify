import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId }: { userId: string } = await req.json();

  try {
    const checks = await prisma.website.findMany({
      where: {
        userId
      }
    });
    return new Response(JSON.stringify({checks}), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
