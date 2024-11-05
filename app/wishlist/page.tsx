import api from "@/core/api";
import ItemCard from "../_components/items/card";

const Wishlist = async () => {
  const wishlist = await api.get.wishlistItems(1);

  if (!wishlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-4">
        <span className="text-sm text-default-500">
          {wishlist?.items.length} Items Found
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist?.items?.map((item) => (
            <ItemCard key={item.id} item={item.item} wishlistItemId={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
