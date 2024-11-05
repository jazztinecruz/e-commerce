import { Item } from "@prisma/client";

const getWishlistItems = async (wishlistId: number) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-wishlist`;

    const wishlistItems: Item = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(wishlistId),
    }).then((res) => res.json());

    return wishlistItems;
  } catch (error) {
    console.error(error);
  }
};

export default getWishlistItems;
