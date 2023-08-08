import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getPostDetails } from "@/lib/actions";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { PostInterface } from "@/common.types";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const postDetails = result?.post;

  const renderLink = () => `/profile/${postDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="w-full max-w-4xl flexBetween gap-y-8 max-xs:flex-col">
        <div className="flex items-start flex-1 w-full gap-5 max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={postDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-col flex-1 gap-1 flexStart">
            <p className="self-start text-lg font-semibold">
              {postDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{postDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${postDetails.category}`}
                className="font-semibold text-primary-purple"
              >
                {postDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === postDetails?.createdBy?.email && (
          <div className="flex items-center justify-end gap-2">
            <ProjectActions projectId={postDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${postDetails?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flex-col mt-20 flexCenter">
        <p className="max-w-5xl text-xl font-normal">
          {postDetails?.description}
        </p>

        <div className="flex flex-wrap gap-5 mt-5">
          {/* <Link
            href={postDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="gap-2 font-medium flexCenter tex-sm text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link> */}
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          {/* <Link
            href={postDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="gap-2 font-medium flexCenter tex-sm text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link> */}
        </div>
      </section>

      <section className="w-full gap-8 flexCenter mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={postDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={postDetails?.createdBy?.id}
        projectId={postDetails?.id}
      />
    </Modal>
  );
};

export default Project;
