import { PostInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
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

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllPosts(category, endcursor)) as PostSearch;

  const postsToDisplay = data?.postSearch?.edges || [];

  if (postsToDisplay.length === 0) {
    return (
      <section className="flex flex-col items-center justify-start px-5 py-6 lg:px-20">
        <Categories />

        <p className="w-full px-2 my-10 text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-start px-5 py-6 mb-16 lg:px-20">
      <Categories />

      <section className="projects-grid">
        {postsToDisplay.map(({ node }: { node: PostInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={data?.postSearch?.pageInfo?.startCursor}
        endCursor={data?.postSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.postSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.postSearch?.pageInfo.hasNextPage}
      />
    </section>
  );
};

export default Home;
