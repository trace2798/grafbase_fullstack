import { redirect } from "next/navigation";

import { PostInterface } from "@/common.types";
import Modal from "@/components/Modal";
import EditPost from "@/components/edit-post";
import { getPostDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <Modal>
      <h3 className="flex justify-center w-full pt-10 text-2xl md:text-4xl">Edit Project</h3>
      <EditPost session={session} post={result?.post} />
    </Modal>
  );
};

export default EditProject;
