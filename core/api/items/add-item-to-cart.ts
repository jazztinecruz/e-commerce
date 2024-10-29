import { CartItem as PrismaCartItem } from "@prisma/client";

export interface CartItem extends Omit<PrismaCartItem, "id"> {
  id?: string;
}

const addItemToCart = async (data: CartItem) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-to-cart`;

    const requestBody = {
      data: {
        cartId: data.cartId,
        itemId: data.itemId,
        quantity: data.quantity,
      },
    };

    const cartedItem: CartItem = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());

    return cartedItem;
  } catch (error) {
    console.error(error);
  }
};

export default addItemToCart;
