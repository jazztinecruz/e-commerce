import { Item } from "@prisma/client";

const getItems = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-items`;

    const items = await fetch(URL).then((res) => res.json());
    return items as Item[];
  } catch (error) {
    console.error(error);
  }
};

export default getItems;
