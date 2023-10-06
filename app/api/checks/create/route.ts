import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, URL, userId }: { name: string; URL: string, userId: string } = await req.json();

  

  try {
    const createdCheck = await prisma.website.create({
      data: {
        name,
        url: URL,
        userId: userId,
      },
    });

    console.log(process.env.NODE_ENV)

    return new Response(JSON.stringify(createdCheck), {
      status: 201,
    });
  } catch (error: any) {
    console.log(error)
    return new Response(
      JSON.stringify({
        errorMsg: error.message,
        error,
      }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
