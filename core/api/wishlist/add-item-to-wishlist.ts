import { Item } from "@prisma/client";

type BodyRequest = {
  wishlistId: number;
  itemId: number;
};

const addItemToWishlist = async ({ wishlistId, itemId }: BodyRequest) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-item-to-wishlist`;

    const requestBody = {
      data: {
        wishlistId,
        itemId,
      },
    };

    const newSavedItem: Item = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());

    return newSavedItem;
  } catch (error) {
    console.error(error);
  }
};

export default addItemToWishlist;
