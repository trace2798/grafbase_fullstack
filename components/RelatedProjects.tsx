import Link from "next/link";
import { getUserPosts } from "@/lib/actions";
import { PostInterface, UserProfile } from "@/common.types";
import Image from "next/image";

type Props = {
  userId: string;
  postId: string;
};

const RelatedProjects = async ({ userId, postId }: Props) => {
  const result = (await getUserPosts(userId)) as { user?: UserProfile };

  const filteredPosts = result?.user?.posts?.edges?.filter(
    ({ node }: { node: PostInterface }) => node?.id !== postId
  );

  if (filteredPosts?.length === 0) return null;

  return (
    <section className="flex flex-col w-full mt-32">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-base text-primary-purple"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 my-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {filteredPosts?.map(({ node }: { node: PostInterface }) => (
          <div className="flex justify-center items-center flex-col rounded-2xl min-w-[210px] min-h-[197px] drop-shadow-card">
            <Link
              href={`/post/${node?.id}`}
              className="relative flex items-center justify-center w-full h-full group"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="object-cover w-full h-full rounded-2xl bg-sky-100"
                alt="post_image"
              />

              <div className="absolute bottom-0 right-0 items-end justify-end hidden w-full gap-2 p-4 text-lg font-semibold text-white group-hover:flex h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
