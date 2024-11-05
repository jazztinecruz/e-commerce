"use client";

import { Checkbox } from "@nextui-org/react";
import CartItem from "./cart-item";
import type api from "@/core/api";
import { ChangeEvent, useState } from "react";
import { ExtendedCartItem } from "@/core/types/item";
import Checkout from "./checkout";

type Props = {
  cartItems: Awaited<ReturnType<typeof api.get.cart.items>>;
};

const CartItems = ({ cartItems }: Props) => {
  const [selectedItems, setSelectedItems] = useState<ExtendedCartItem[]>([]);

  if (!cartItems) return <div>Cart is empty</div>;

  const handleSelect = (item: ExtendedCartItem) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(cartItems.items);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-10">
      <div className="space-y-4">
        <h1 className="flex items-center gap-2">
          <span className="text-2xl font-bold">Cart</span>
          <span className="text-default-foreground">
            ({cartItems.items.length} Items)
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <Checkbox onChange={(event) => handleSelectAll(event)} />
          <span className="text-sm text-default-500">
            Select All ({cartItems.items.length}) Items
          </span>
        </div>

        <ul>
          {cartItems.items.map((cartItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                isSelected={selectedItems.includes(cartItem)}
                onChange={() => handleSelect(cartItem)}
              />
              <CartItem
                cartItemId={cartItem.id}
                cartItem={cartItem.item}
                cartId={Number(cartItems.id)}
                quantity={cartItem.quantity}
              />
            </div>
          ))}
        </ul>
      </div>

      <Checkout selectedItems={selectedItems} />
    </div>
  );
};

export default CartItems;
