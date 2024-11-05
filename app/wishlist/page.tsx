import api from "@/core/api";

const Wishlist = async () => {
  const wishlist = await api.get.wishlistItems(1);

  console.log(wishlist);
  return <div>Wishlist</div>;
};

export default Wishlist;
