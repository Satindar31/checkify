"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { AiOutlineEdit } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import validator from "validator";

export default function EditBtn({
  className,
  checkId,
}: {
  className?: string;
  checkId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [validURL, setValidURL] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (
      validator.isURL(url, {
        require_protocol: true,
      })
    ) {
      setValidURL(true);
    }
  }, [url]);

  function editCheck() {
    if (name.length < 3)
      return toast.error("Name must be at least 4 characters long.");
    else if (
      !validator.isURL(url, {
        require_protocol: true,
      })
    )
      return toast.error("URL is not valid.");

    toast("Editing check...", {
      duration: 1500,
    });
    setLoading(true);
    fetch("/api/checks/edit", {
      method: "PUT",
      body: JSON.stringify({
        id: checkId,
        name: name,
        URL: url,
      }),
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Successfuly edited check!", {
            icon: "success",
          });
          router.refresh();
          setTimeout(() => {}, 50);
          setLoading(false);
          return router.refresh();
        }
        if (!res.ok) {
          res.json().then((data) => console.error(data));
          setLoading(false);
          return toast.error("An error occured while editing check.");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occured while editing check.");
        console.error(err);
      });
  }

  return (
    <>
      <Button isIconOnly onPress={onOpen} size="sm" className={cn(className)}>
        <AiOutlineEdit />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit check
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Check name"
                  placeholder={user?.firstName + "'s portfolio"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Check URL"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={validURL ? "text-green-500" : "text-red-500"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Discard Changes
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={() => {
                    editCheck();
                    onClose();
                  }}
                >
                  Save check
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
