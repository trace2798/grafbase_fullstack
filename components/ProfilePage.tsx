import { PostInterface, UserProfile } from "@/common.types";
import Image from "next/image";

import Link from "next/link";

import PostCard from "./post-card";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/lib/session";

type Props = {
  user: UserProfile;
};

const ProfilePage = async ({ user }: Props) => {
  const session = await getCurrentUser();
  console.log(user, "user info");
  const length = user?.posts?.edges?.length;
  const randomIndex = Math.floor(Math.random() * length);
  return (
    <section className="flex-col w-full mx-auto flexCenter max-w-10xl paddings">
      <section className="w-full gap-10 flexBetween max-lg:flex-col">
        <div className="flex flex-col items-start w-full">
          <p className="mt-10 text-2xl font-bold">
            Hi my name is{" "}
            <span className="text-4xl font-extrabold dark:text-slate-400 text-slate-500">
              {user?.name}
            </span>
          </p>
          <p className="mt-5 text-lg font-extrabold md:text-xl lg:text-4xl lg:w-3/4 text-primary">
            <span>{user.description}</span>
          </p>
          <div className="flex flex-wrap w-full gap-5 mt-8">
            <Link href={`mailto:${user?.email}`}>
              <Button variant="secondary" className="mb-10">
                Contact Me
              </Button>
            </Link>
            <Button variant="outline" className="mb-10">
              Number of Post: {user?.posts.edges.length}
            </Button>
            {session?.user?.id === user.id && (
              <Link href={`/settings/${user?.id}`}>
                <Button variant="outline" className="mb-10">
                  Update
                </Button>
              </Link>
            )}
          </div>
        </div>

        {user?.posts?.edges?.length > 0 ? (
          <>
            <div className="flex lg:w-[50%] lg:h-[50%">
              <div>
                <Image
                  src={user?.posts?.edges[randomIndex]?.node?.image}
                  alt="project image"
                  width={739}
                  height={554}
                  className="object-contain rounded-xl bg-sky-100"
                />
              </div>
              <div>
                <h1 className="ml-10 font-bold w-fit">
                  {user?.posts?.edges[randomIndex]?.node?.title}
                </h1>
              </div>
            </div>
          </>
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="post_image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flex flex-col items-center justify-start w-full mt-16 lg:mt-28">
        <p className="w-full text-lg font-semibold text-left">Recent Work</p>
        <div className="grid grid-cols-1 gap-8 mt-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {user?.posts?.edges?.map(({ node }: { node: PostInterface }) => (
            <PostCard
              key={`${node?.id}`}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              description={node?.description}
              name={user.name}
              avatarUrl={user.avatarUrl}
              userId={user.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
