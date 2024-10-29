import getUser from "./user/get-user";
import getItem from "./items/get-item";
import getItems from "./items/get-items";
import addItemToCart, { CartItem } from "./items/add-item-to-cart";

const api = {
  get: {
    user: () => getUser(),
    item: {
      single: (id: string) => getItem(id),
      multiple: () => getItems(),
    },
  },
  mutation: {
    addItemToCart: (data: CartItem) => addItemToCart(data),
  },
};

export default api;
