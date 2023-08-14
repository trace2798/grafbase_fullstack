import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getPostDetails } from "@/lib/actions";

import PostActions from "@/components/post-actions";
import RelatedPosts from "@/components/post-by-user";
import { PostInterface } from "@/common.types";

const PostIdPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post)
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[80vh]">
        <Image
          src="/not-found.jpg"
          width={500}
          height={500}
          alt="not-found-image"
          className="rounded-xl"
        />
        <p className="mt-10 text-xl font-semibold">
          Sorry the post you are searching for could not be found.
        </p>
      </div>
    );

  const postDetails = result?.post;

  const renderLink = () => `/profile/${postDetails?.createdBy?.id}`;

  return (
    <>
      <section className="flex items-center justify-between w-full pt-10 gap-y-8 max-xs:flex-col">
        <div className="flex flex-col items-center flex-1 w-full gap-5 max-xs:flex-col">
          <div className="flex flex-col items-start flex-1 gap-1">
            <p className="self-start text-3xl font-semibold">
              {postDetails?.title}
            </p>

            <div className="flex flex-wrap justify-center w-full gap-2 mt-3 text-sm font-normal whitespace-nowrap">
              <Link
                href={renderLink()}
                className="flex items-center justify-start"
              >
                <Image
                  src={postDetails?.createdBy?.avatarUrl}
                  width={20}
                  height={20}
                  alt="profile"
                  className="rounded-full bg-neutral-200"
                />
              </Link>
              <Link href={renderLink()}>{postDetails?.createdBy?.name}</Link>
            </div>
            {session?.user?.email === postDetails?.createdBy?.email && (
              <div className="flex items-center justify-center w-full gap-2">
                <PostActions postId={postDetails?.id} />
              </div>
            )}
            <h1 className="flex justify-center w-full font-semibold text-primary-purple">
              {postDetails?.category}
            </h1>
          </div>
        </div>
      </section>

      <section className="flex justify-center mt-14">
        <Image
          src={`${postDetails?.image}`}
          className="object-cover bg-blue-100 rounded-2xl"
          width={500}
          height={500}
          alt="poster"
        />
      </section>

      <section className="flex flex-col items-center mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {postDetails?.description}
        </p>
      </section>

      <RelatedPosts
        userId={postDetails?.createdBy?.id}
        postId={postDetails?.id}
      />
    </>
  );
};

export default PostIdPage;
