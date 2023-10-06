import CheckmarkSVG from "@/components/basic/checkmarkSVG";
import Container from "@/components/basic/container";
import { Check } from "@/interfaces/check";
import { Spinner } from "@nextui-org/spinner";
import { Suspense } from "react";

export default async function CheckPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(process.env.URL + "/api/checks/details", {
    method: "POST",
    body: JSON.stringify({ id: params.id }),
  });
  const data: Check = await response.json();
  if (!response.ok) {
    throw new Error(data.errorMsg, {
      cause: data.error,
    });
  }
  return (
    <Container className="overflow-hidden overflow-x-hidden overflow-y-hidden">
      <Suspense fallback={<Spinner size="lg" />}>
        <div className="h-screen flex flex-col items-center gap-3">
        <h1 className="uppercase text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{`${data.name}'s status`.toLocaleUpperCase()}</h1>
        {data.up ? <CheckmarkSVG /> : <p>Down currently</p>}
        Status: {data.status}
        {data.response !== 200 || 201 ? (
          <div>Reponse text: {data.status}</div>
        ) : (
          <></>
        )}
        </div>
      </Suspense>
    </Container>
  );
}
