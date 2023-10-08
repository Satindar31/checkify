"use client";

import Container from "@/components/basic/container";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import validator from "validator";

export default function NewCheckPage() {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");
  const [validURL, setValidURL] = useState(false);

  const { user } = useUser();

  const router = useRouter();

  function createCheck() {
    if (name.length < 3)
      return toast.error("Name must be at least 4 characters long.");
    else if (
      !validator.isURL(URL, {
        require_protocol: true,
      })
    )
      return toast.error("URL is not valid.");

    toast("Creating new check...", {
      duration: 1500,
    });
    fetch(
      `${
        process.env.NEXT_PUBLIC_URL ?? "https://" + process.env.VERCEL_URL
      }/api/checks/create`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          URL,
          userId: user?.id,
        }),
      }
    ).then((res) => {
      if (!res.ok) {
        return toast.error("Failed to create check. Try again.");
      } else {
        toast.success("Successfuly created check. Redirecting to dashboard...");
        router.push("/dashboard");
        return router.refresh();
      }
    });
  }

  useEffect(() => {
    if (
      validator.isURL(URL, {
        require_protocol: true,
      })
    )
      setValidURL(true);
    else setValidURL(false);
  }, [URL]);

  return (
    <Container>
      <h1 className="text-5xl text-center sm:text-7xl font-bold mb-4">
        Create a new check
      </h1>
      <div className="w-2/3 gap-3 flex flex-col">
        <Input
          isRequired
          label="Name"
          placeholder="My website"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          isRequired
          label="URL"
          placeholder="https://example.com"
          onChange={(e) => setURL(e.target.value)}
          value={URL}
          className={`${validURL ? "text-green-500" : "text-red-500"}`}
        />
        <Button onClick={createCheck}>Create check</Button>
      </div>
    </Container>
  );
}
