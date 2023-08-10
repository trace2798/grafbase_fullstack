import { redirect } from "next/navigation";
import { PostInterface } from "@/common.types";
import EditPost from "@/components/edit-post";
import { getPostDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";

const EditPostPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post)
    return (
      <div
        key={0}
        className="flex flex-col items-center justify-center w-full min-h-[80vh]"
      >
        <Image
          src="/not-found-user.jpg"
          width={500}
          height={500}
          alt="not-found-image"
          className="rounded-xl"
        />
        <p className="mt-10 text-xl font-semibold">
          Sorry the user you are looking for could not be found.
        </p>
      </div>
    );

  return (
    <>
      <h3 className="flex justify-center w-full pt-10 text-2xl md:text-4xl">
        Edit Post
      </h3>
      <EditPost session={session} post={result?.post} />
    </>
  );
};

export default EditPostPage;
