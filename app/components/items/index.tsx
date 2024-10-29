import api from "@/core/api";
import { CATEGORY } from "@prisma/client";
import ItemCard from "./card";

const Items = async () => {
  const items = await api.get.item.multiple();
  const user = await api.get.user();
  const categories = Object.values(CATEGORY);

  if (!items) {
    return;
  }

  return (
    <div className="grid lg:grid-cols-[auto,1fr] gap-6">
      <div>
        <ul>
          {categories.map((category) => (
            <li key={category} className="capitalize">
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <span className="text-sm text-default-500">
          {items.length + 1} Items Found
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              cartId={Number(user?.cart[0].id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Items;
