import type { CartItem, Item, WishlistItems } from "@prisma/client";

export type ExtendedCartItem = CartItem & { item: Item };
export type ExtendedItem = Item & {
  cartItems: CartItem[];
  wishlistItems: WishlistItems[];
};

export type ExtendedWishlistItem = {
  id: number;
  wishlistId: number;
  item: Item;
};

export type ExtendedWishlist = {
  id: number;
  userId: string;
  items: ExtendedWishlistItem[];
};
