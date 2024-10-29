import { CartItem } from "@prisma/client";

const removeCartItem = async (id: number) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/delete-from-cart`;

    const removedCartItem: CartItem = await fetch(URL, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    return removedCartItem;
  } catch (error) {
    console.error(error);
  }
};

export default removeCartItem;
