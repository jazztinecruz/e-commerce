import { Item } from "@prisma/client";

const getItem = async (id: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-item?id=${id}`;

    const item = await fetch(URL).then((res) => res.json());
    return item as Item;
  } catch (error) {
    console.error(error);
  }
};

export default getItem;
