import { ExtendedItem } from "@/core/types/item";
import { CATEGORY } from "@prisma/client";

const getItemsByCategory = async (category: string) => {
  try {
    const URL = `${
      process.env.NEXT_PUBLIC_API_URL
    }/get-items-by-category?category=${category.toUpperCase() as CATEGORY}`;

    const items = await fetch(URL).then((res) => res.json());
    return items as ExtendedItem[];
  } catch (error) {
    console.error(error);
  }
};

export default getItemsByCategory;
