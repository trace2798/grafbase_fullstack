import { UserForm } from "@/common.types";
import CardWithForm from "@/components/settings-form";
import { getUser } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const userSettingsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const user = (await getUser(id)) as { user?: UserForm };

  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh]">
        <CardWithForm session={session} user={user?.user} />
      </div>
    </>
  );
};

export default userSettingsPage;
