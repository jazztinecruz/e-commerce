import { CartItem } from "@prisma/client";

const updateCartItem = async (data: CartItem) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-from-cart`;

    const requestBody = {
      data: {
        id: data.id,
        cartId: data.cartId,
        itemId: data.itemId,
        quantity: data.quantity,
      },
    };

    const updateCartItem: CartItem = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());

    return updateCartItem;
  } catch (error) {
    console.error(error);
  }
};

export default updateCartItem;
