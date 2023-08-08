"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="relative flex items-center justify-center w-full h-full group"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="object-cover w-full h-full rounded-2xl"
          alt="project image"
        />

        <div className="absolute bottom-0 right-0 items-end justify-end hidden w-full gap-2 p-4 text-lg font-semibold text-white group-hover:flex h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between w-full px-2 mt-3 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>
          <div className="flex items-center justify-center gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <p>{name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
