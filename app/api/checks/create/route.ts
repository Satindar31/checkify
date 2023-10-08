import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();

export const runtime = "edge"

export async function POST(req: Request) {
  const { name, URL, userId }: { name: string; URL: string; userId: string } =
    await req.json();

  try {
    const createdCheck = await prisma.website.create({
      data: {
        name,
        url: URL,
        userId: userId,
      },
    });

    try {
      const response: Response = await fetch(createdCheck.url);
      await prisma.website.update({
        where: {
          id: createdCheck.id,
        },
        data: {
          lastChecked: new Date(),
          response: response.status,
          status: response.statusText,
        },
      });
    } catch (err: any) {
      if(err.code == "ENOTFOUND") {
        await prisma.website.update({
          where: {
            id: createdCheck.id,
          },
          data: {
            lastChecked: new Date(),
            up: false,
            response: 404,
            status: "Could not resolve DNS."

          },
        });
      }
      await prisma.website.update({
        where: {
          id: createdCheck.id,
        },
        data: {
          lastChecked: new Date(),
          up: false,
        },
      });
    } finally {
      await prisma.$disconnect();
    }

    return new Response(JSON.stringify(createdCheck), {
      status: 201,
    });
  } catch (error: any) {
    console.log(error);
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
