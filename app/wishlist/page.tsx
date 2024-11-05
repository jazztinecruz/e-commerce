import api from "@/core/api";
import ItemCard from "../_components/items/card";

const Wishlist = async () => {
  const wishlist = await api.get.wishlistItems(1);

  if (!wishlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-2">
        <span className="text-2xl font-bold">Wishlist</span>
        <span className="text-default-foreground">
          ({wishlist.items.length} Items)
        </span>
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.items?.map((item) => (
          <ItemCard key={item.id} item={item.item} wishlistItemId={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
