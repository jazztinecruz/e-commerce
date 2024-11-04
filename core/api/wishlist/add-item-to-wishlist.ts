import { Item } from "@prisma/client";

type BodyRequest = {
  userId: string;
  itemId: number;
};

const addItemToWishlist = async ({ userId, itemId }: BodyRequest) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-item-to-wishlist`;

    const requestBody = {
      data: {
        userId,
        itemId,
      },
    };

    const savedItem: Item = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());

    return savedItem;
  } catch (error) {
    console.error(error);
  }
};

export default addItemToWishlist;
