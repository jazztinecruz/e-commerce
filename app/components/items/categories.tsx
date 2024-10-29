"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { CATEGORY } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const Categories = () => {
  const categories = Object.values(CATEGORY);
  const pathname = usePathname();
  const router = useRouter();

  const handleClickCategory = (category: string) => {
    const newURL = new URL(pathname, window.location.origin);
    newURL.searchParams.set("category", category.toLowerCase());
    router.push(newURL.toString());
  };

  return (
    <Tabs
      isVertical
      aria-label="Categories"
      onSelectionChange={(key: React.Key) => handleClickCategory(String(key))}>
      {categories.map((category) => (
        <Tab key={category} title={category} />
      ))}
    </Tabs>
  );
};

export default Categories;
