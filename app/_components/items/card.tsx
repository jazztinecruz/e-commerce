"use client";

import { Button, Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import api from "@/core/api";
import { CartItem } from "@/core/api/items/add-item-to-cart";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import type { ExtendedItem } from "@/core/types/item";

type Props = {
  item: ExtendedItem;
  cartId?: number;
  wishlistItemId?: number;
  refetchItems?: () => void;
};

const ItemCard = ({ item, refetchItems, wishlistItemId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isInWishlistPage = pathname === "/wishlist";

  const [isAdding, setIsAdding] = useState(false);

  const { mutate: addToCart } = useMutation({
    mutationFn: (data: CartItem) => api.mutation.addItemToCart(data),
  });

  const hasAlreadyAddedToWishlist = item.wishlistItems?.some(
    (wishlistItem) => wishlistItem.itemId === item.id
  );

  const { mutate: addToWishlist } = useMutation({
    mutationFn: () =>
      api.mutation.addItemToWishlist({
        itemId: item.id,
        wishlistId: 1,
      }),
    onSuccess: () => {
      setIsAdding(true);
      refetchItems?.();
      toast.success("Item added to your Cart!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add item to Cart.");
    },
  });

  const { mutate: removeFromWishList } = useMutation({
    mutationFn: () => api.mutation.removeWishlistItem(wishlistItemId as number),
    onSuccess: () => {
      setIsAdding(true);
      router.refresh();
      toast.success("Item removed from your Wishlist!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove item from Wishlist.");
    },
  });

  const handleAddToCart = useCallback(() => {
    addToCart(
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
  }, [item.id, addToCart, router]);

  useEffect(() => {
    const second = setTimeout(() => {
      setIsAdding(false);
    }, 2000);

    return () => {
      clearTimeout(second);
    };
  }, [handleAddToCart]);

  return (
    <Card
      as="li"
      shadow="sm"
      key={item.id}
      isPressable
      className="hover:bg-slate-100 transition-colors duration-300 cursor-pointer">
      <CardBody className="space-y-2">
        <div className="flex items-center w-full justify-between">
          <b>{item.name}</b>
          <p className="text-default-500 text-base whitespace-nowrap">
            PHP {item.price}
          </p>
        </div>
        <p className="text-default-500">{item.description}</p>
      </CardBody>
      <CardFooter className="text-small text-left items-start">
        <div className="flex items-center gap-2 w-full mt-auto">
          <Button onClick={handleAddToCart}>
            {isAdding ? "Added to Cart" : "Add to Cart"}
          </Button>

          {!isInWishlistPage ? (
            !hasAlreadyAddedToWishlist ? (
              <Tooltip content="Add to Wishlist">
                <button onClick={() => addToWishlist()}>
                  <HeartIcon className="size-6" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip content="Added to Wishlist">
                <HeartSolidIcon className="size-6" fill="red" />
              </Tooltip>
            )
          ) : (
            <Button variant="ghost" onClick={() => removeFromWishList()}>
              Remove from Wishlist
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
