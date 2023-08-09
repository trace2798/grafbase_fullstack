"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (type === "prev" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    } else if (type === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="flex items-center justify-center w-full gap-5 mt-10">
      {hasPreviousPage && (
        <Button variant="ghost" onClick={() => handleNavigation("prev")}>
          To the Beginning
        </Button>
      )}
      {hasNextPage && (
        <Button variant="ghost" onClick={() => handleNavigation("next")}>
          Next
        </Button>
      )}
    </div>
  );
};

export default LoadMore;