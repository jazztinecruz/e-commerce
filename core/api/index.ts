import getUser from "./user/get-user";
import getItem from "./items/get-item";
import addItemToCart, { CartItem } from "./items/add-item-to-cart";
import getItemsByCategory from "./items/get-items-by-category";
import getCartItems from "./cart/get-cart-items";
import updateCartItem from "./cart/update-cart-item";
import type { CartItem as PrismaCartItem } from "@prisma/client";

const api = {
  get: {
    user: () => getUser(),
    item: {
      single: (id: string) => getItem(id),
      multiple: (category: string) => getItemsByCategory(category),
    },
    cart: {
      items: () => getCartItems(),
    },
  },
  mutation: {
    addItemToCart: (data: CartItem) => addItemToCart(data),
    updateCartItem: (data: PrismaCartItem) => updateCartItem(data),
  },
};

export default api;
