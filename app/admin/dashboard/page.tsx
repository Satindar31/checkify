"use client"

import Container from "@/components/basic/container";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

import { toast } from "sonner";

export default function AdminDashboard() {
  const { user } = useUser();

  async function triggerAllChecks() {
    toast("Triggering all checks...");
    fetch((process.env.NEXT_PUBLIC_URL + "/api/check/round1") ?? process.env.VERCEL_URL + '/api/check/round1', { cache: 'no-cache' }).then((res) => {
      if(res.ok) return toast.success("Successfully triggered all checks.")
      return toast.error("Something went wrong while triggering all checks.")
    });
  }
  if (user?.publicMetadata.role == "admin") {
    toast.success("Welcome back, " + user?.firstName);
    return (
      <Container className="flex flex-col gap-3">
        <h1>Admin Dashboard</h1>
        <Button onClick={triggerAllChecks}>Trigger all checks</Button>
      </Container>
    );
  }
  return (
    <Container>
      <h1 className="text-7xl font-bold text-center">Unauthorized</h1>
    </Container>
  )
}
