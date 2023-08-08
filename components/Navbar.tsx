import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constant";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import { Poppins } from "next/font/google";
import ProfileMenu from "./ProfileMenu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({ weight: "600", subsets: ["latin"] });

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex items-center justify-between gap-4 px-8 py-5 border-b border-nav-border">
      <div className="flex items-center justify-start flex-1 gap-10">
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
           Graphy
          </h1>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <ModeToggle />
            <Link href="/create-project">
              <Button variant="ghost">Post</Button>
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
