import type { Item } from "@prisma/client";

const removeCartItem = async (id: number) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/delete-item-from-wishlist`;

    const removedSavedItem: Item = await fetch(URL, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    return removedSavedItem;
  } catch (error) {
    console.error(error);
  }
};

export default removeCartItem;
