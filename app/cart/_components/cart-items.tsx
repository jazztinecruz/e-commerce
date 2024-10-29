"use client";

import CartItem from "./cart-item";
import type api from "@/core/api";

type Props = {
  cartItems: Awaited<ReturnType<typeof api.get.cart.items>>;
};

const CartItems = ({ cartItems }: Props) => {
  if (!cartItems) return <div>Cart is empty</div>;

  return (
    <div>
      <h1 className="flex items-center gap-2">
        <span className="text-2xl font-bold">Cart</span>
        <span className="text-default-foreground">
          ({cartItems.items.length} Items)
        </span>
      </h1>
      <ul>
        {cartItems.items.map(({ item, quantity }, index) => (
          <CartItem
            key={index}
            cartItem={item}
            cartId={Number(cartItems.id)}
            quantity={quantity}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
