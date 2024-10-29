import getUser from "./user/get-user";
import getItem from "./items/get-item";
import addItemToCart, { CartItem } from "./items/add-item-to-cart";
import getItemsByCategory from "./items/get-items-by-category";

const api = {
  get: {
    user: () => getUser(),
    item: {
      single: (id: string) => getItem(id),
      multiple: (category: string) => getItemsByCategory(category),
    },
  },
  mutation: {
    addItemToCart: (data: CartItem) => addItemToCart(data),
  },
};

export default api;
