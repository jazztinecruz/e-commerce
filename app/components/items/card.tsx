"use client";

import { Item } from "@prisma/client";
import { Card, CardFooter } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import api from "@/core/api";
import { CartItem } from "@/core/api/items/add-item-to-cart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  item: Item;
  cartId: number;
};

const ItemCard = ({ item, cartId }: Props) => {
  const { mutate } = useMutation({
    mutationFn: (data: CartItem) => api.mutation.addItemToCart(data),
  });

  const router = useRouter();

  const handleAddToCart = () => {
    mutate(
      {
        cartId,
        itemId: item.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          router.refresh();
          toast.success("Item added to your Cart!");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to add item to Cart.");
        },
      }
    );
  };

  return (
    <Card
      shadow="sm"
      key={item.id}
      isPressable
      className="hover:bg-slate-100 transition-colors duration-300 cursor-pointer">
      <CardFooter className="text-small flex flex-col gap-2 text-left items-start">
        <div className="flex items-center w-full justify-between">
          <b>{item.name}</b>
          <p className="text-default-500 text-base whitespace-nowrap">
            PHP {item.price}
          </p>
        </div>
        <p className="text-default-500">{item.description}</p>
        <div className="flex items-end w-full">
          <PlusCircleIcon
            onClick={handleAddToCart}
            className="size-6 hover:fill-foreground-500"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
