import { getUserPosts } from "@/lib/actions";
import ProfilePage from "@/components/ProfilePage";
import { UserProfile } from "@/common.types";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const UserProfile = async ({ params }: Props) => {
  const result = (await getUserPosts(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user)
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[80vh]">
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

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
