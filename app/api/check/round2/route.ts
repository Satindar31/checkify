import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();
export const runtime = "edge"

export async function GET() {
  const checks = await prisma.website.findMany({
    orderBy: {
      createdAt: "asc",
    },
    skip: 30,
    take: 30,
  });

  fetch(
    process.env.URL ?? "https://" + process.env.VERCEL_URL + "/api/check/round3"
  );

  checks.map(async (check) => {
    const response = await fetch(check.url);
    if (!response.ok) {
      // TODO SEND EMAIL ALERT TO CHECK OWNER
      console.log(
        "Check with ID" + check.id + " is down... Status: " + response.status
      );

      try {
        const updateCheck = await prisma.website.update({
          where: {
            id: check.id,
          },
          data: {
            response: response.status,
            status: response.statusText,
            up: false,
          },
        });

      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
        });
      } finally {
        await prisma.$disconnect();
      }

      return new Response("ERROR", {
        status: response.status,
      });
    }

    return new Response("OK", {
      status: 200,
    });
  });
  return new Response("RUNNING CHECKS");
}
