"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";

export default function DeleteBtn({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const router = useRouter();

  function deleteCheck() {
    toast("Deleting check...", {
      duration: 1500,
    });
    fetch(`/api/checks/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Check deleted.");
          router.refresh()
          return router.refresh();
        } else {
          toast.error("Failed to delete check.");
          return router.refresh();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete check.");
        return router.refresh();
      });
  }

  return (
    <Button
      className={cn(`${className}`)}
      size="sm"
      onPress={deleteCheck}
      color="danger"
      isIconOnly
    >
      <AiOutlineDelete className="text-lg" />
    </Button>
  );
}
