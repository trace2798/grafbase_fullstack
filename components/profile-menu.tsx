"use client";
import { SessionInterface } from "@/common.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LogOut, Milestone, Settings } from "lucide-react";

const ProfileDropdownMenu = ({ session }: { session: SessionInterface }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8">
          {session?.user?.avatarUrl && <AvatarImage src={session.user.avatarUrl} />}
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group">
          <Milestone className="w-5 h-5 mr-3 text-zinc-200 dark:text-zinc-600 group-hover:text-primary" />
          <Link href={`/profile/${session?.user?.id}`} className="text-sm">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex group">
          <Settings className="w-5 h-5 mr-3 text-zinc-200 dark:text-zinc-600 group-hover:text-primary" />
          <Link href={`/settings/${session?.user?.id}`} className="text-sm">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="group">
          <LogOut className="w-5 h-5 mr-3 text-zinc-200 dark:text-zinc-600 group-hover:text-primary" />{" "}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
