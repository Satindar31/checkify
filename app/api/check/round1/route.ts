import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();

import {render} from '@react-email/render'
import { Email } from "@/emails/down";
import nodemailer from 'nodemailer';

export const runtime = "edge";

export async function GET() {
  try {
    const checks = await prisma.website.findMany({
      orderBy: {
        createdAt: "asc",
      },
      take: 30,
    });

    await fetch(
      process.env.URL ??
        "https://" + process.env.VERCEL_URL + "/api/check/round2"
    );

    checks.map(async (check) => {
      try {
        const response = await fetch(check.url);
        if (!response.ok) {
          await prisma.website.update({
            where: {
              id: check.id,
            },
            data: {
              status: response.statusText,
              up: false,
              response: response.status,
            },
          });


        }
        await prisma.website.update({
          where: {
            id: check.id,
          },
          data: {
            status: response.statusText,
            up: true,
            response: response.status,
          },
        });
      } catch (err: any) {
        await prisma.website.update({
          where: {
            id: check.id,
          },
          data: {
            status: "DOWN",
            up: false,
            response: -1,
          },
        });
      }
    });
    return new Response("RUNNING CHECKS");
  } catch (err: any) {
    return new Response(err.message, {
      status: 500,
    });
  }
}
