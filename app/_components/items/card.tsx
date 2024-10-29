"use client";

import { Item } from "@prisma/client";
import { Button, Card, CardFooter, Tooltip } from "@nextui-org/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import api from "@/core/api";
import { CartItem } from "@/core/api/items/add-item-to-cart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type Props = {
  item: Item;
  cartId: number;
};

const ItemCard = ({ item, cartId }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const { mutate } = useMutation({
    mutationFn: (data: CartItem) => api.mutation.addItemToCart(data),
  });

  const router = useRouter();

  const handleAddToCart = () => {
    mutate(
      {
        cartId: 1,
        itemId: item.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          setIsAdding(true);
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

  useEffect(() => {
    const second = setTimeout(() => {
      setIsAdding(false);
    }, 2000);

    return () => {
      second;
    };
  }, [handleAddToCart]);

  return (
    <Card
      as="li"
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
        <div className="flex items-center gap-2 w-full">
          <Button onClick={handleAddToCart}>
            {isAdding ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Tooltip content="Add to Wishlist">
            <HeartIcon className="size-6" />
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
