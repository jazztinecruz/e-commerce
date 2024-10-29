import api from "@/core/api";
import CartItems from "./_components/cart-items";

const Cart = async () => {
  const cartItems = await api.get.cart.items();
  return <CartItems cartItems={cartItems} />;
};

export default Cart;
