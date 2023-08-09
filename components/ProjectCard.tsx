"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const ProjectCard = ({
  id,
  image,
  title,
  description,
  name,
  avatarUrl,
  userId,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-10 rounded-2xl drop-shadow-card">
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
          <p className="w-full text-indigo-900 line-clamp-2">{description}</p>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-between w-full px-2 mt-3 text-sm font-semibold">
        <h1 className="text-xl md:text-3xl">{title}</h1>
        <Link href={`/profile/${userId}`}>
          <div className="flex items-center justify-center gap-2">
            <Avatar className="w-5 h-5">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <p>{name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
