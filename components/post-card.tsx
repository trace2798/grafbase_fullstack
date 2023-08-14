"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const PostCard = ({
  id,
  image,
  title,
  description,
  name,
  avatarUrl,
  userId,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-10 border dark:border-none rounded-2xl drop-shadow-card">
      <Link
        href={`/post/${id}`}
        className="relative flex items-center justify-center w-full h-full group"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="object-cover w-full h-full bg-neutral-200 rounded-2xl"
          alt="post_image"
        />
        <div className="absolute bottom-0 right-0 items-end justify-end hidden w-full gap-2 p-4 text-lg font-semibold text-white group-hover:flex h-1/4 bg-zinc-100/10 backdrop-blur-sm rounded-b-2xl">
          <p className="w-full pt-1 text-indigo-900 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-between w-full px-2 mt-3 text-sm font-semibold">
        <h1 className="text-lg md:text-xl xl:text-2xl">{title}</h1>
        <Link href={`/profile/${userId}`}>
          <div className="flex items-center justify-center gap-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={avatarUrl} alt="profile_image" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <p>{name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
