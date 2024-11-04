"use client";

import api from "@/core/api";
import ItemCard from "./card";
import Categories from "./categories";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const GetItems = () => {
  const category = useSearchParams().get("category");

  const { data: items, isLoading } = useQuery({
    queryKey: ["items", category],
    queryFn: async () => await api.get.item.multiple(String(category)),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await api.get.user(),
  });

  console.log(items);
  if (!items || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid lg:grid-cols-[auto,1fr] gap-6">
      <Categories />
      <div className="space-y-4">
        <span className="text-sm text-default-500">
          {items.length} Items Found
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              cartId={Number(user?.cart.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Items = () => {
  return (
    <Suspense>
      <GetItems />
    </Suspense>
  );
};

export default Items;
