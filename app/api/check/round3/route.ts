import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const check = await prisma.website.findMany({
    orderBy: {
      createdAt: "asc",
    },
    skip: 60,
    take: 30
  });

  fetch(
    process.env.URL ?? "https://" + process.env.VERCEL_URL + "/api/check/round4"
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
}
