import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const check = await prisma.website.findMany({
      orderBy: {
        createdAt: "asc",
      },
      take: 30,
    });

    fetch(
      process.env.URL ??
        "https://" + process.env.VERCEL_URL + "/api/check/round2"
    );

    check.map(async (check) => {
      const response = await fetch(check.url);
      if (!response.ok) {
        // TODO SEND EMAIL ALERT TO CHECK OWNER
        console.log("Check with ID" + check.id + " is down... Status: " + response.status)
        return new Response("ERROR", {
          status: response.status,
        });
      }
      return new Response("OK", {
        status: 200,
      });
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ errorMsg: error.message, error: error })
    );
  } finally {
    await prisma.$disconnect();
  }
}
