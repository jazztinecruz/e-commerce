import { CartItem, Item } from "@prisma/client";
import api from "..";

type getCartItemsResponse = {
  id: string;
  items: (CartItem & { item: Item })[];
  userId: string;
};

const getCartItems = async () => {
  const user = await api.get.user();

  if (!user) return null;

  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-cart`;

    const cartItems: getCartItemsResponse = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    }).then((res) => res.json());

    const sortedCartItems = {
      ...cartItems,
      items: cartItems.items.sort((a, b) => a.id - b.id),
    };

    return sortedCartItems;
  } catch (error) {
    console.error(error);
  }
};

export default getCartItems;
