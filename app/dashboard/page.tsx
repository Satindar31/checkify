import Container from "@/components/basic/container";
import { Spinner } from "@nextui-org/spinner";
import { Check } from "@/interfaces/check";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { UserButton, UserProfile, currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return <Spinner />;
  }
  const response = await fetch(`${process.env.URL}/api/checks/getAll`, {
    method: "POST",
    body: JSON.stringify({
      userId: user?.id,
    }),
    next: {
      revalidate: 3600
    }
  });
  const data = await response.json();

  const checks: Check[] = data.checks;

  return (
    <Container>
      <div className="absolute top-3 right-3">
      <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link href={"/dashboard/new-check"}>
          <Button>Create check</Button>
        </Link>
      </div>
      <Divider className="m-3" />
      {checks.length == 0 || checks == null ? (
        <Link href={"/dashboard/new-check"}>
          <Button size="lg">Create check</Button>
        </Link>
      ) : (
        checks.map((check) => (
          <Card className="" key={check.id}>
            <CardHeader><Link href={`/check/${check.id}`}>{check.name}</Link></CardHeader>
            <Divider />

            <CardBody>
              {check.up ? (
                <div>Up</div>
              ) : (
                <div>Down Code: {check.response}</div>
              )}
            </CardBody>
          </Card>
        ))
      )}
    </Container>
  );
}
