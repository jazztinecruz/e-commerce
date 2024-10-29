"use client";

import api from "@/core/api";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { CartItem, Item } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  cartItem: Item;
  cartId: number;
  quantity: number;
};

const CartItem = ({ cartItem, cartId, quantity }: Props) => {
  const [quantityCount, setQuantityCount] = useState(quantity);

  const { mutate } = useMutation({
    mutationFn: (data: CartItem) => api.mutation.updateCartItem(data),
  });

  const handleUpdateCartItem = (newCount: number) => {
    mutate(
      {
        id: cartItem.id,
        cartId,
        itemId: cartItem.id,
        quantity: newCount,
      },
      {
        onSuccess: () => {
          toast.success("Item updated in Cart!");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to update item in Cart!");
        },
      }
    );
  };

  const handleIncrease = () => {
    const newCount = quantityCount + 1;
    setQuantityCount(newCount);
    handleUpdateCartItem(newCount);
  };

  const handleDecrement = () => {
    const newCount = quantityCount - 1;
    if (newCount < 1) return;
    setQuantityCount(newCount);
    handleUpdateCartItem(newCount);
  };

  return (
    <li className="grid grid-cols-3 items-center justify-between py-4 border-b border-gray-200">
      <div className="flex flex-col gap-1">
        {/* Product Info */}
        <h3 className="text-lg font-semibold">{cartItem.name}</h3>
        <p className="text-gray-400 text-xs">{cartItem.category}</p>
        {cartItem.description && (
          <p className="text-gray-500 text-sm">{cartItem.description}</p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex justify-end items-center gap-2">
        <button onClick={handleDecrement} className="p-1 border rounded">
          <MinusIcon className="w-5 h-5 text-gray-600" />
        </button>
        <span className="px-2">{quantityCount}</span>
        <button onClick={handleIncrease} className="p-1 border rounded">
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-col items-end">
        <p className="text-lg font-semibold text-gray-900">
          PHP {cartItem.price.toFixed(2)}
        </p>
        <button className="flex items-center text-sm text-red-500 mt-1">
          <TrashIcon className="w-4 h-4 mr-1" />
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
