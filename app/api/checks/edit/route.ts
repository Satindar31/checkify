import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const {
    name,
    URL,
    id,
  }: { name: string; URL: string; id: string } =
    await req.json();

  try {
    const check = await prisma.website.update({
      where: {
        id,
      },
      data: {
        name,
        url: URL,
      },
    });
    return new Response(JSON.stringify(check), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
