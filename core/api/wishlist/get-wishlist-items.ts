import type { ExtendedWishlist } from "@/core/types/item";

const getWishlistItems = async (id: number) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-wishlist`;

    const wishlistItems: ExtendedWishlist = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    return wishlistItems;
  } catch (error) {
    console.error(error);
  }
};

export default getWishlistItems;
