import { getUserPosts } from "@/lib/actions";
import ProfilePage from "@/components/ProfilePage";
import { UserProfile } from "@/common.types";

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
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
