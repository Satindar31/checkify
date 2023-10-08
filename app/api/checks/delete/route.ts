import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const check = await prisma.website.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify(check), { status: 200 });
  } catch (err: any) {
    if (err.code === "P2025") {
      return new Response(JSON.stringify({ error: "Check not found" }), {
        status: 404,
      });
    } else {
      console.error(err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
