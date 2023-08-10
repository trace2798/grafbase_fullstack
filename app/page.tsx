import { PostInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/load-more";
import PostCard from "@/components/post-card";
import { fetchAllPosts } from "@/lib/actions";

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
  // console.log(data?.postSearch?.pageInfo?.startCursor);
  // console.log(data?.postSearch?.pageInfo.hasNextPage);
  const postsToDisplay = data?.postSearch?.edges || [];

  if (postsToDisplay.length === 0) {
    return (
      <section className="flex flex-col items-center justify-start px-5 py-6 lg:px-20">
        <Categories />

        <p className="w-full px-2 my-10 text-center">
          No posts found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-start px-5 py-6 mb-16 lg:px-20">
      {/* <Categories /> */}
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
      {/* <LoadMore
        startCursor={data?.postSearch?.pageInfo?.startCursor}
        endCursor={data?.postSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.postSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.postSearch?.pageInfo.hasNextPage}
      /> */}
    </section>
  );
};

export default Home;
