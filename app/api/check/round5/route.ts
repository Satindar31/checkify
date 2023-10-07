import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const checks = await prisma.website.findMany({
    orderBy: {
      createdAt: "asc",
    },
    skip: 120,
  });


  checks.map(async (check) => {
    const response = await fetch(check.url);
    if (!response.ok) {
      // TODO SEND EMAIL ALERT TO CHECK OWNER
      console.log("Check with ID" + check.id + " is down... Status: " + response.status)

      return new Response("ERROR", {
        status: response.status,
      });
    }
    

    await fetch(process.env.URL + "/api/check/round1")

    return new Response("OK", {
      status: 200,
    });
  });
  return new Response("RUNNING CHECKS")
}
