"use client";

import { deletePost, fetchToken } from "@/lib/actions";
import { FileSignature, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WarningModal } from "./warning-modal";
import { Button } from "./ui/button";

type Props = {
  projectId: string;
};

const PostActions = ({ projectId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    try {
      await deletePost(projectId, token);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <WarningModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeleteProject}
        loading={loading}
      />
      <Link
        href={`/edit-post/${projectId}`}
        className="flex items-center justify-center"
      >
        <Button
          disabled={loading}
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <FileSignature className="w-5 hover:text-blue-600" />
        </Button>
      </Link>

      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </>
  );
};

export default PostActions;
