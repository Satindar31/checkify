import Container from "@/components/basic/container";
import { SignUpButton, currentUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const user = await currentUser();
  return (
    <Container className="flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white">
        We will alert you if your website goes down <br />
        before your customers do
      </h1>
      <div className="flex flex-row gap-3">
        {user ? (
          <>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <Button variant="bordered">Learn more</Button>
          </>
        ) : (
          <>
            <SignUpButton redirectUrl="/dashboard" mode="modal">
              <Button href="/dashboard">Register</Button>
            </SignUpButton>
            <Button variant="bordered">Learn more</Button>
          </>
        )}
      </div>
    </Container>
  );
}
