"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categoryFilters } from "@/constant";
import { Button } from "./ui/button";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-5">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter ? "bg-secondary font-medium" : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
