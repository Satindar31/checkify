import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();
export const runtime = "edge"

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const check = await prisma.website.findFirstOrThrow({
      where: {
        id,
      },
    });


    return new Response(JSON.stringify(check), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        errorMsg: error.message,
        error,
      }),
      {
        status: 500,
      }
    );
  }
}
