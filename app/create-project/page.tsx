import { redirect } from "next/navigation";

import PostForm from "@/components/post-form";
import { getCurrentUser } from "@/lib/session";
import CreatePost from "@/components/create-post";

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <>
      <h3 className="flex justify-center w-full pt-10 text-2xl md:text-4xl">Create a New Post</h3>
      {/* <PostForm type="create" session={session} /> */}
      <CreatePost  session={session} />
    </>
  );
};

export default CreateProject;
