import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/post-form";
import { getCurrentUser } from "@/lib/session";
import { getPostDetails } from "@/lib/actions";
import { PostInterface } from "@/common.types";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result?.post} />
    </Modal>
  );
};

export default EditProject;
