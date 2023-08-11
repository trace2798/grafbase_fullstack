import { UserProfile } from "@/common.types";
import CardWithForm from "@/components/settings-form";
import { getUser } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { FC } from "react";

const userSettingsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const user = (await getUser(id)) as { user?: UserProfile };

  return (
    <>
      <div className="flex items-center justify-center md:min-h-[80vh]">
        <CardWithForm session={session} user={user?.user} />
      </div>
    </>
  );
};

export default userSettingsPage;
