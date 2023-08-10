import { PostInterface } from "@/common.types";
import Banner from "@/components/banner";
import PostCard from "@/components/post-card";
import { fetchAllPosts } from "@/lib/actions";
import Image from "next/image";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type PostSearch = {
  postSearch: {
    edges: { node: PostInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async () => {
  const data = (await fetchAllPosts()) as PostSearch;
  const postsToDisplay = data?.postSearch?.edges || [];

  if (postsToDisplay.length === 0) {
    return (
      <section className="flex flex-col items-center justify-start px-5 py-6 lg:px-20">
        <Banner />
        <div className="flex flex-col items-center justify-center w-full min-h-[80vh]">
          <Image
            src="/not-found.jpg"
            width={500}
            height={500}
            alt="not-found-image"
            className="rounded-xl"
          />
          <p className="mt-10 text-xl font-semibold">
            Create a post to get started.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-start px-5 py-6 mb-16 lg:px-20">
      <Banner />
      <section className="grid w-3/4 grid-cols-1 gap-5 mt-10 lg:w-2/3 md:grid-cols-2">
        {postsToDisplay.map(({ node }: { node: PostInterface }) => (
          <PostCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
            description={node?.description}
          />
        ))}
      </section>
    </section>
  );
};

export default Home;
